import React , { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { set } from "lodash";

const ToggleDarkMode = () => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
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
      {theme == "dark" ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
};

export default ToggleDarkMode;
