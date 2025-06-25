"use client";

import { AppStateContext } from "@/components/providers/app";
import { Languages, LanguagesMap } from "@/lib/constants";
import { Text } from "@/components/ui/typography";
import { AppStateActions } from "@/model/types";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectValue,
  SelectGroup,
  SelectItem,
  Select,
} from "@/components/ui/select";

const { SET_LANGUAGE } = AppStateActions;

export const Preferences = () => {
  const { value } = AppStateContext.useSelector(
    ({ context }) => context.language
  );

  const appStateActorRef = AppStateContext.useActorRef();

  const onValueChange = (label: string) => {
    const language = LanguagesMap.get(label);
    if (!language) return;
    appStateActorRef.send({ type: SET_LANGUAGE, payload: language });
  };

  const { theme, setTheme } = useTheme();
  return (
    <div>
      <Text
        variant="h4"
        as="h4"
        className="text-lg font-medium mb-3 text-zinc-700 dark:text-zinc-300"
      >
        Preferences & Appearance
      </Text>
      <div className="flex flex-col gap-3.5 divide-y divide-gray-100 dark:divide-neutral-900 [&>div]:pb-4 border rounded-sm max-w-sm pt-4 [&>div]:px-4">
        {/* Color Theme */}
        <div className="flex items-center gap-3 justify-between">
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
            <Sun className="h-[1.2rem] w-[1.2rem] transition-all text-black dark:text-gray-500" />
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={theme === "dark"}
                onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary dark:peer-checked:bg-primary" />
            </label>
            <Moon className="h-[1.2rem] w-[1.2rem] transition-all text-gray-400/80 dark:text-white" />
          </div>
        </div>

        {/* Language */}
        <div className="flex items-center gap-3 justify-between">
          <div className="flex flex-col">
            <Text
              as="p"
              className="text-base font-medium tracking-tight text-zinc-700 dark:text-zinc-400"
            >
              Language
            </Text>
            <Text className="text-muted-foreground text-xs !m-0" as="span">
              Select your default language
            </Text>
          </div>

          <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="max-w-[130px] focus:ring-1 focus:ring-offset-1 ">
              <div className="flex items-center gap-1 [&_svg]:h-4 [&_svg]:w-4 py-1 px-1">
                <SelectValue placeholder="Select Language" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                {Languages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    <div className="flex items-center gap-2">
                      {language.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
