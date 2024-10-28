import React, { useState } from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "../ui/Card";
import { BotMessageSquare } from "lucide-react";

function ChatSection() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const postMessage = async (message) => {
    try {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { text: message, sender: "user" },
      ]);
      setMessage("");
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { text: "...let's me think...", sender: "bot" },
      ]);
      const response = await fetch("http://localhost:5050/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ message }),
        body: JSON.stringify({ message, history: chatHistory }),
      });
      const data = await response.json();
      setChatHistory((prevHistory) => [
        ...prevHistory.slice(0, -1),
        { text: data.response, sender: "bot" },
      ]);
    } catch (error) {
      console.error(error);
      setChatHistory((prevHistory) => [
        ...prevHistory.slice(0, -1),
        {
          text: "Sorry, I am not able to process your request right now",
          sender: "bot",
        },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && message.trim() !== "") {
      postMessage(message);
      setMessage("");
    }
  };

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BotMessageSquare size={24} className="inline-block mr-2" />
          Chat with AI
        </CardTitle>
        <CardDescription>
          ask any question and let AI find the answer in this data
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center relative">
        <Card className="w-full absolute bg-opacity-80 bg-gray-400  h-full p-4 flex items-center justify-center">
          <p className="text-white">Temporary not available to save my token cost. Contact me if you want to test it out.</p>
        </Card>
        <Card className="w-full min-h-2.5 flex flex-col items-center p-4">

          {!chatHistory.length && (
            <div className="mt-4 mb-4 p-2 border bg-sparkOrange rounded-md basis-1/2 self-start">
              <BotMessageSquare size={24} className="inline-block mr-2" />
              Hi, ask me anything
            </div>
          )}
          {chatHistory.map((msg, index) => (
            <div key={index} className={`message ${msg.sender} mt-4 p-2 border border-gray-300 rounded-md basis-1/2 self-end`}>
              <BotMessageSquare size={24} className="inline-block mr-2 botMessageSquare" />
              {msg.text}
            </div>
          ))}

          {/* INPUT BOX */}
          <div className="flex gap-4 mt-4">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              className="text-base p-2 border border-gray-300 rounded-md"
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              className="bg-sparkOrange text-white px-4 py-2 rounded-md"
              onClick={() => postMessage(message)}
            >
              Send
            </button>
          </div>
        </Card>
      </CardContent>
    </Card>
  );
}

export default ChatSection;
