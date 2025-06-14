// src/context/ThemeContext.jsx
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true";
  });

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem("isDarkMode", newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    document.body.className = isDark ? "dark-mode" : "light-mode";
  }, [isDark]);

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
};