"use client";

import GlobalStyle from "@/app/global-styles";
import { useTheme } from "@/context/ThemeContext";
import type React from "react";
import { ThemeProvider } from "styled-components";

export default function ThemeWrapper({
	children,
}: {
	readonly children: React.ReactNode;
}) {
	const { theme } = useTheme();
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			{children}
		</ThemeProvider>
	);
}
