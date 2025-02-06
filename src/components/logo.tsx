import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => (
  <h1 className={cn("text-xl font-medium", className)}>
    {siteConfig.title}
    <small className="text-blue-700">.AI</small>
  </h1>
);
