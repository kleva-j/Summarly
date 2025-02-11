"use client";

import type { PropsWithChildren } from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider> & PropsWithChildren;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider {...props}>{children}</NextThemesProvider>
	);
}
