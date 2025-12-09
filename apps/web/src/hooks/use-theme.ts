import { ThemeContext } from "@/components";
import { use } from "react";

export const useTheme = () => {
    const context = use(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};