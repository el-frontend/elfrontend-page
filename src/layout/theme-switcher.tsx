'use client';

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const onChangeTheme = useCallback(() => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [theme]);

  return (
    <Button variant="ghost" onClick={onChangeTheme} className="p-0">
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </Button>
  );
};

export default ThemeSwitcher;
