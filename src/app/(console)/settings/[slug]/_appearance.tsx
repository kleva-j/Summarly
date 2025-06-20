"use client";

import { Text } from "@/components/ui/typography";
import { ColorThemes } from "@/lib/constants";
import { CircleCheck } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

export const Appearance = () => {
  const { resolvedTheme, setTheme } = useTheme();

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

        <RadioGroupPrimitive.Root
          value={resolvedTheme}
          onValueChange={setTheme}
          className="flex items-center gap-3 sm:mx-auto"
        >
          {ColorThemes.map((theme) => (
            <RadioGroupPrimitive.Item
              key={theme.value}
              value={theme.value}
              className={cn(
                "relative group ring-[1px] ring-border rounded py-1.5 px-2.5",
                "data-[state=checked]:ring-[1px] data-[state=checked]:ring-sky-500 flex gap-2 items-center w-fit"
              )}
              onClick={() => setTheme(theme.value)}
            >
              <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-4 text-primary fill-sky-500 stroke-white group-data-[state=unchecked]:hidden" />

              <theme.icon className="text-muted-foreground size-4" />
              <span className="text-sm font-normal tracking-tight">
                {theme.label}
              </span>
            </RadioGroupPrimitive.Item>
          ))}
        </RadioGroupPrimitive.Root>
      </div>
    </div>
  );
};
