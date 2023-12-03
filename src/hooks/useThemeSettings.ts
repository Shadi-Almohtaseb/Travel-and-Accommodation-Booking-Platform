import { useEffect, useState } from "react";

const useThemeSettings = () => {
  const [currentMode, setCurrentMode] = useState<string>(
    localStorage.getItem("theme") || "Light"
  );

  const toggleTheme = () => {
    const newTheme = currentMode === "Light" ? "Dark" : "Light";
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new Event("themeChange"));
    setCurrentMode(newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", currentMode === "Dark");
  }, [currentMode]);

  const iconColor = currentMode === "Light" ? "4D4D4D" : "FFFFFF";

  return { currentMode, toggleTheme, iconColor };
};

export { useThemeSettings };
