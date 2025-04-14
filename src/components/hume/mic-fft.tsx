"use client";

import { AutoSizer } from "react-virtualized";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MicFFTProps {
  fft: number[];
  className?: string;
}

export function MicFFT({ fft, className }: MicFFTProps) {
  return (
    <div className="relative size-full">
      <AutoSizer>
        {({ width, height }) => (
          <motion.svg
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            className={cn("absolute !inset-0 !size-full", className)}
          >
            <title>Microphone FFT</title>
            {Array.from({ length: 24 }).map((_, index) => {
              const value = (fft[index] ?? 0) / 4;
              const h = Math.min(Math.max(height * value, 2), height);
              const yOffset = height * 0.5 - h * 0.5;

              return (
                <motion.rect
                  key={`mic-fft-${
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    index
                  }`}
                  height={h}
                  width={2}
                  x={2 + (index * width - 4) / 24}
                  y={yOffset}
                  rx={4}
                />
              );
            })}
          </motion.svg>
        )}
      </AutoSizer>
    </div>
  );
}
