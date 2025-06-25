"use client";

import { Text } from "@/components/ui/typography";
import { Moon, Sun } from "lucide-react";

export const Appearance = () => {
  return (
    <div className="space-y-2 my-2 py-2">
      <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3">
        <div className="flex flex-col">
          <Text
            as="p"
            className="text-base font-medium tracking-tight text-zinc-700 dark:text-zinc-400"
          >
            Color Theme
          </Text>
          <Text className="text-muted-foreground text-xs !m-0" as="span">
            Choose your default color theme
          </Text>
        </div>

        <div className="ml-auto relative group inline-flex items-center gap-2">
          <Moon className="h-[1.2rem] w-[1.2rem] transition-all text-gray-400/80 dark:text-white" />
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600 dark:peer-checked:bg-red-600" />
          </label>
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all text-black dark:text-gray-500" />
        </div>
      </div>
    </div>
  );
};
