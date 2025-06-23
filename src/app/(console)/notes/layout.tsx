import type { PropsWithChildren } from "react";

import { CreateRecording } from "@/dashboard/_components/create-recording";
import { Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { MicIcon } from "lucide-react";

export default function NotesLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col p-4">
      <main className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="flex-1 space-y-4 md:px-2">
          <div className="flex md:items-center justify-between flex-col md:flex-row gap-4">
            <Text as="h2" className="text-3xl font-bold tracking-tight">
              Notes
            </Text>
            <div className="flex gap-2 items-center xs:items-center max-xs:space-y-4 xs:space-x-2 xs:flex-row">
              <CreateRecording>
                <Button className="p-2 size-10 rounded-full cursor-pointer">
                  <MicIcon aria-hidden="true" size={24} />
                </Button>
              </CreateRecording>
            </div>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
