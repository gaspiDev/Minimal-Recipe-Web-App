import React from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface ThemeToggleProps {
  theme: "feminine" | "masculine";
  onThemeChange: (theme: "feminine" | "masculine") => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onThemeChange,
}) => {
  const toggleTheme = () => {
    onThemeChange(
      theme === "feminine" ? "masculine" : "feminine",
    );
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className={`relative w-14 h-8 rounded-full p-0 border-2 transition-all duration-300 ${
              theme === "feminine"
                ? "bg-gradient-to-r from-pink-100 to-rose-100 border-pink-200 hover:from-pink-200 hover:to-rose-200"
                : "bg-gradient-to-r from-sky-100 to-blue-100 border-sky-200 hover:from-sky-200 hover:to-blue-200"
            }`}
          >
            <div
              className={`absolute w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center transform ${
                theme === "feminine"
                  ? "-translate-x-3 bg-gradient-to-r from-pink-500 to-rose-500"
                  : "translate-x-3 bg-gradient-to-r from-sky-500 to-blue-500"
              }`}
            >
              {theme === "feminine" ? (
                <span className="text-white text-xs">♀</span>
              ) : (
                <span className="text-white text-xs">♂</span>
              )}
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {theme === "feminine"
              ? "Cambiar a tema masculino"
              : "Cambiar a tema femenino"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeToggle;