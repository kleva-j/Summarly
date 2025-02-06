import { NAV_ITEMS } from "@/lib/constants";

export const siteConfig = {
  name: "Summarly",
  title: "Summarly",
  description: "When summary meets editing.",
  longDescription:
    "Summarly is a powerful tool that helps you summarize and transcribe audio files into text. With our AI-powered platform, you can easily upload your audio files, select the language, and receive a summary and transcription in just a few clicks.",
  navItems: NAV_ITEMS,
  mainNav: [],
  links: {
    x: "https://twitter.com/summarly",
    github: "https://github.com/kleva-j/Summarly",
    discord: "/"
  },
  navigations: {
    links: {
      home: {
        name: "Home",
        href: "/",
      },
      "sign-in": {
        name: "Sign in",
        href: "/sign-in",
      },
      "sign-up": {
        name: "Sign up",
        href: "/sign-up",
      },
      dashboard: {
        name: "Dashboard",
        href: "/dashboard",
      },
    },
  },
};
