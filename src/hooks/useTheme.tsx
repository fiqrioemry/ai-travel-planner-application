import { useEffect, useState } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    if (saved !== null) {
      return saved === "dark";
    }
    return true; // default: dark
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleDark = () => setIsDark((prev) => !prev);

  return { isDark, toggleDark };
}
