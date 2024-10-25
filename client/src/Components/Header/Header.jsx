import React from "react";
import ToggleDarkMode from "./ToggleDarkMode";

function Header({title}) {
  return (
    <div className="bg-card dark:bg-dark-card p-4 shadow-card text-headline font-bold rounded-xl shadow border flex justify-between">
      <h1 className="text-sparkOrange text-h1 tracking-wide text-left">{title}</h1>
      <ToggleDarkMode />
    </div>
  );
}

export default Header;
