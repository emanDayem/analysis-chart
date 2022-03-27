import { createContext } from "react";

export const themes = {
  dark: "",
  light: "dark-theme",
};

export type ThemeContextType = {
    theme: string;
    changeTheme: (value: string) => void;
  };

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);