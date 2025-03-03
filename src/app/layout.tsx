import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { ConvexClientProvider } from "@/components/providers/convex";
import { PostHogProvider } from "@/components/providers/posthog";
import { PostHogPageView } from "@/components/posthog/pageview";
import { ThemeProvider } from "@/components/providers/theme";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { geistMono, geistSans } from "@/lib/font";
import { ClerkProvider } from "@clerk/nextjs";
import { siteConfig } from "@/lib/config";
import { Suspense } from "react";

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
					<PostHogProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<ConvexClientProvider>
								<Suspense fallback={null}>
									<PostHogPageView />
								</Suspense>
								<NuqsAdapter>{props.children}</NuqsAdapter>
							</ConvexClientProvider>
						</ThemeProvider>
					</PostHogProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
