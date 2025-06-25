import type { PropsWithChildren } from "react";

import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/typography";

export default async function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 p-4">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col [&>p]:mt-0! mt-2">
          <Text variant="h3" as="h2">
            Update Settings
          </Text>
          <Text variant="p" className="text-sm text-muted-foreground mt-0!">
            Manage your account settings
          </Text>
        </div>
        <Separator className="mt-1 my-5 max-w-sm" />
        {children}
      </div>
    </div>
  );
}
