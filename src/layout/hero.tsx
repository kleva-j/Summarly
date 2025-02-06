import { AnimatedGridPattern } from "@/components/animated-grid-pattern";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export const Hero = () => {
  return (
    <div className="relative min-h-[calc(100vh_-_theme(spacing.16))] flex items-center justify-center px-6 overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-full skew-y-12",
        )}
      />
      <div className="relative z-10 text-center max-w-2xl">
        <Badge className="bg-gradient-to-br via-70% from-primary via-muted/30 to-primary rounded-full py-1 border-none transition-all duration-300">
          Just released v1.0.0
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight">
          Get perfect notes and transcriptions with AI.
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          {siteConfig.longDescription}
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base cursor-pointer">
            Get Started <ArrowUpRight className="!size-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full text-base shadow-none cursor-pointer"
          >
            <CirclePlay className="!size-5" /> Watch Demo
          </Button>
        </div>
      </div>
    </div>
  );
};
