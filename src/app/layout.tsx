import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";

// Providers
import { ActiveThemeProvider } from "@/components/theme/active-theme";
import { ConvexClientProvider } from "@/components/providers/convex";
import { PostHogProvider } from "@/components/providers/posthog";
import { ThemeProvider } from "@/components/providers/theme";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ClerkProvider } from "@clerk/nextjs";

// Components & Utils
import { PostHogPageView } from "@/components/posthog/pageview";
import { Toaster } from "@/components/ui/sonner";
import { COOKIE_NAME } from "@/lib/constants";
import { fontVariables } from "@/lib/font";
import { siteConfig } from "@/lib/config";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};
COOKIE_NAME;

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

export default async function RootLayout(props: PropsWithChildren) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get(COOKIE_NAME)?.value;
  const isScaled = activeThemeValue?.endsWith("-scaled");

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{
              __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
            }}
          />
        </head>
        <body
          className={cn(
            "bg-background overscroll-none font-sans antialiased",
            activeThemeValue ? `theme-${activeThemeValue}` : "",
            isScaled ? "theme-scaled" : "",
            fontVariables
          )}
        >
          <PostHogProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              enableColorScheme
            >
              <ActiveThemeProvider initialTheme={activeThemeValue}>
                <ConvexClientProvider>
                  <Suspense fallback={null}>
                    <PostHogPageView />
                  </Suspense>
                  <NuqsAdapter>{props.children}</NuqsAdapter>
                </ConvexClientProvider>
              </ActiveThemeProvider>
            </ThemeProvider>
          </PostHogProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
