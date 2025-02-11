import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { ConvexClientProvider } from "@/components/providers/convex";
import { ThemeProvider } from "@/components/providers/theme";
import { geistMono, geistSans } from "@/lib/font";
import { ClerkProvider } from "@clerk/nextjs";
import { siteConfig } from "@/lib/config";

import "@/app/globals.css";

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
};

export default function RootLayout(props: PropsWithChildren) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>

						<ConvexClientProvider>{props.children}</ConvexClientProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
