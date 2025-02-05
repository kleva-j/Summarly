import { siteConfig } from "@/lib/config";

export const Logo = () => (
  <h1 className="text-xl font-medium">{siteConfig.title}<small className="text-muted-foreground">.AI</small></h1>
);
