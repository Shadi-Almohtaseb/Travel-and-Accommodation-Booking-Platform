import { useEffect, useState } from "react";

const useThemeSettings = () => {
  const [currentMode, setCurrentMode] = useState(
    localStorage.getItem("theme") || "Light"
  );

  const toggleTheme = () => {
    const newTheme = currentMode === "Light" ? "Dark" : "Light";
    localStorage.setItem("theme", newTheme);
    setCurrentMode(newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", currentMode === "Dark");
  }, [currentMode]);

  const iconColor = currentMode === "Light" ? "4D4D4D" : "FFFFFF";

  return { currentMode, toggleTheme, iconColor };
};

export { useThemeSettings };
