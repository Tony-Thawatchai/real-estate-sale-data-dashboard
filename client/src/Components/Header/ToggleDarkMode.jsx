import React from "react";
import { Moon, Sun } from "lucide-react";

const ToggleDarkMode = () => {
  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  return (
    <button onClick={toggleTheme} className="p-2 ">
      {document.documentElement.classList.contains("dark") ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
};

export default ToggleDarkMode;
