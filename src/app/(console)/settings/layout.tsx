import type { PropsWithChildren } from "react";

import { Text } from "@/components/ui/typography";

export default async function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 p-4">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col [&>p]:mt-0! mb-7 mt-2">
          <Text variant="h3" as="h1">
            Update Settings
          </Text>
          <Text variant="p" className="text-muted-foreground mt-0!">
            Manage your account settings
          </Text>
        </div>
        {children}
      </div>
    </div>
  );
}
