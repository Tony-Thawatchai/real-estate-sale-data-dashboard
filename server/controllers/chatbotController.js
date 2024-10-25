import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Helper function to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loadCSV = (filePath) => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};

const convertCSVToText = (csvData) => {
  return csvData.map((row) => Object.values(row).join(", ")).join("\n");
};

// Custom query transformation function
const transformQuery = (query, history) => {
  const historyText = history.map((msg) => `${msg.sender}: ${msg.text}`).join("\n");
  return `${historyText}\nUser: ${query}`;
};


export const getChatbotResponse = async (req, res) => {
  const { message, history = [] } = req.body; 

  let textData = "";
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.sparkOpenAIKey,
  });

  //   if ./faiss.index doesn't exists, create it
  if (!fs.existsSync("./faiss.index")) {
    console.log("No vector file found, creating one");
    try {
      const csvFilePath = path.join(
        __dirname,
        "../../client/public/data/resale-data-copy.csv"
      );
      const csvData = await loadCSV(csvFilePath);

      textData = convertCSVToText(csvData);

    } catch (error) {
      console.error("Error parse CSV", error);
      res.status(500).json({ error: "Error parse CSV" });
    }

    try {
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
      });
      const docs = await textSplitter.createDocuments([textData]);

      const vectorstore = await FaissStore.fromDocuments(docs, embeddings);
      await vectorstore.save("./");
      console.log("Vectorstore saved");

    } catch (error) {
      console.error("Error saving vectorstore", error);
      res.status(500).json({ error: "Error saving vectorstore" });
    }
  }

  try {
    const vectorStore = await FaissStore.load("./", embeddings);

    const model = new ChatOpenAI({ 
        openAIApiKey: process.env.sparkOpenAIKey,
        temperature: 0 ,
        modelName: "gpt-4o-mini",
    });

    const chain = new RetrievalQAChain({
      combineDocumentsChain: loadQAStuffChain(model),
      retriever: vectorStore.asRetriever(),
      returnSourceDocuments: true,
    });


    // Limit the history to the last 5 messages
    const limitedHistory = history.slice(-5);

    // Transform the query with history
    const transformedQuery = transformQuery(message, limitedHistory);
    console.log(transformedQuery);

    // Ensure the query is a string
    const response = await chain.call({
      query: String(transformedQuery),
    });

        // Update history with the new message and response
    const updatedHistory = history.concat([
      { role: "user", content: message },
      { role: "bot", content: response.text },
    ]);

    res.status(200).json({ response: response.text, history: updatedHistory });
  } catch (error) {
    console.error("Error splitting documents", error);
    res.status(500).json({ error: "Error splitting documents" });
  }
};
