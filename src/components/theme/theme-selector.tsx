"use client";

import { useThemeConfig } from "@/components/theme/active-theme";
import { Label } from "@/components/ui/label";

import {
  SelectSeparator,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectItem,
  Select,
} from "@/components/ui/select";

const DEFAULT_THEMES = [
  { name: "Default", value: "default" },
  { name: "Blue", value: "blue" },
  { name: "Amber", value: "amber" },
  { name: "Teal", value: "teal" },
  { name: "Lime", value: "lime" },
];

const SCALED_THEMES = [
  { name: "Default", value: "default-scaled" },
  { name: "Blue", value: "blue-scaled" },
];

const MONO_THEMES = [{ name: "Mono", value: "mono-scaled" }];

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig();

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="theme-selector" className="sr-only">
        Theme
      </Label>
      <Select value={activeTheme} onValueChange={setActiveTheme}>
        <SelectTrigger
          id="theme-selector"
          size="sm"
          className="justify-start *:data-[slot=select-value]:w-12"
        >
          <span className="text-muted-foreground hidden sm:block">
            Select a theme:
          </span>
          <span className="text-muted-foreground block sm:hidden">Theme</span>
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            <SelectLabel>Default</SelectLabel>
            {DEFAULT_THEMES.map((theme) => (
              <SelectItem key={theme.name} value={theme.value}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Scaled</SelectLabel>
            {SCALED_THEMES.map((theme) => (
              <SelectItem key={theme.name} value={theme.value}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Monospaced</SelectLabel>
            {MONO_THEMES.map((theme) => (
              <SelectItem key={theme.name} value={theme.value}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
