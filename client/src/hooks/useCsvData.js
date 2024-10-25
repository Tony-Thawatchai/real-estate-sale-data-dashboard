// src/hooks/useCsvData.js
import { useState, useEffect } from "react";
import Papa from "papaparse";

export const useCsvData = (url) => {
  const [csvData, setCsvData] = useState(null);

  useEffect(() => {
    const loadCsv = async () => {
      const response = await fetch(url);
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let csvContent = "";

      const read = async () => {
        const { done, value } = await reader.read();
        if (done) {
          return;
        }
        csvContent += decoder.decode(value);
        await read();
      };

      await read();

      Papa.parse(csvContent, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          const sortedData = result.data.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
          });
          setCsvData(sortedData);
        },
      });
    };

    loadCsv();
  }, [url]);

  return csvData;
};
