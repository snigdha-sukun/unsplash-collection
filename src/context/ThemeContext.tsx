"use client";

import { darkTheme, lightTheme } from "@/utils/theme";
import type { ReactNode } from "react";
import {
	createContext,
	useContext,
	useMemo,
	useState,
	useCallback,
} from "react";

type ThemeContextType = {
	isDarkMode: boolean;
	theme: typeof lightTheme;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function CustomThemeProvider({
	children,
}: { readonly children: ReactNode }) {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleTheme = useCallback(() => {
		setIsDarkMode((prev) => !prev);
	}, []);

	const theme = isDarkMode ? darkTheme : lightTheme;

	const value = useMemo(
		() => ({ isDarkMode, toggleTheme, theme }),
		[isDarkMode, toggleTheme, theme],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a CustomThemeProvider");
	}
	return context;
}
