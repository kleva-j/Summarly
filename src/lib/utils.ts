import { clsx, type ClassValue } from "clsx";

import { MonthsShort } from "@/lib/constants";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const genRandomRange = (min: number, max: number, offset = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min + offset;
};

export const genDataPoints = (count = MonthsShort.length) => {
  return Array.from({ length: count }).map((_, index) => ({
    name: MonthsShort[index],
    total: genRandomRange(0, 5000, 1000),
  }));
};
