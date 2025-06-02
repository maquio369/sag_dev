"use client";
import React, { useState, useEffect } from "react";
//import ToggleDarkModeButton from "@/components/elements/ToggleDarkModeButton";
import "@/components/elements/elements.css";

function handleToggle(): void {
  let newTheme = localStorage.getItem("theme") || "light";
  newTheme = newTheme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);
}

const ToggleDarkMode = ({
  isActive,
  className,
}: {
  isActive: boolean;
  className?: string;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const chkDarkModeToggle = document.querySelector('input[name="chkDarkModeToggle"]') as HTMLInputElement;
      chkDarkModeToggle.checked = isDark;
      return isDark;

    }
    return false;
  });
  const [newTheme, setNewTheme] = useState(isDarkMode ? "dark" : "light");

  useEffect(() => {
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
  }, []);

  return (
    <div>
      {isActive ? (
        <div className={"" + className}>
          <ToggleDarkModeButton onClick={handleToggle} />
        </div>
      ) : null}
    </div>
  );
};

const ToggleDarkModeButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <label className="scale-17 w-fit h-0 flex cursor-pointer">
      <input
        className="toggle-checkbox opacity-0 w-0 h-0"
        type="checkbox"
        name="chkDarkModeToggle"
        onClick={onClick}
      ></input>
      <div className="toggle-slot h-[9em] w-[15em] border-[#e4e7ec69] border-8 rounded-full hover:border-textoLink shadow-md transition-all duration-200 ease-in-out">
        <div className="sun-icon-wrapper">
          <svg width="6em" height="6em" viewBox="0 0 36 36">
            <path
              fill="#FFAC33"
              d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2V2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2h2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2h2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0l1.414 1.414zm21 21s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.414-1.414s-1.414-1.414 0-2.828s2.828 0 2.828 0l1.414 1.414zm-.413-18.172s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zM16 32s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2v-2z"
            ></path>
            <circle fill="#FFAC33" cx="18" cy="18" r="10"></circle>
          </svg>
        </div>

        <div className="moon-icon-wrapper">
          <svg fill="#cfdfFf" width="6em" height="6em" viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </div>
      </div>
    </label>
  );
};

export default ToggleDarkMode;
