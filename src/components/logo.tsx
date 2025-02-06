import { siteConfig } from "@/lib/config";

export const Logo = () => (
  <h1 className="text-xl font-medium">{siteConfig.title}<small className="text-blue-700">.AI</small></h1>
);
