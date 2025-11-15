"use client";
import { useEffect, useState, createContext, useContext } from "react";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("default");

  // تحميل الثيم عند البداية
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "default";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);

    updateMetaThemeColor();
  }, []);

  // دالة لتحديث شريط المتصفح
  const updateMetaThemeColor = () => {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-base-100")
      .trim();
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", color);
  };

  // دالة لتغيير الثيم
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    updateMetaThemeColor();
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
