"use client";

import { AppStateContext } from "@/components/providers/app";
import { Languages, LanguagesMap } from "@/lib/constants";
import { Text } from "@/components/ui/typography";
import { AppStateActions } from "@/model/types";

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

export const Advanced = () => {
  const { value } = AppStateContext.useSelector(
    ({ context }) => context.language
  );

  const appStateActorRef = AppStateContext.useActorRef();

  const onValueChange = (label: string) => {
    const language = LanguagesMap.get(label);
    if (!language) return;
    appStateActorRef.send({ type: SET_LANGUAGE, payload: language });
  };

  return (
    <div className="space-y-2 my-2 py-2">
      <div className="flex flex-col items-start md:flex-row md:items-center gap-3">
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
          <SelectTrigger className="w-[135px] sm:mx-auto focus:ring-1 focus:ring-offset-1">
            <div className="flex items-center gap-2 [&_svg]:h-4 [&_svg]:w-4 py-1 px-1">
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
  );
};
