import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { geistMono, geistSans } from "@/lib/font";
import { siteConfig } from "@/lib/config";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {props.children}
      </body>
    </html>
  );
}
