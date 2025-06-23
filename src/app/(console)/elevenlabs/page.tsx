import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextToSpeech } from "@/components/elevenlabs/text-to-speech";
import { Conversation } from "@/components/elevenlabs/conversation";
import { Text } from "@/components/ui/typography";

const tabs = [
  { value: "conversation", label: "Conversational AI", disabled: false },
  { value: "text-to-speech", label: "Text to Speech", disabled: false },
  { value: "voice-isolator", label: "Voice Isolator", disabled: true },
  { value: "voice-changer", label: "Voice Changer", disabled: true },
  { value: "audio-dubbing", label: "Audio Dubbing", disabled: true },
];

export default async function ElevenLabsChatPage() {
  return (
    <section className="w-full p-6 flex flex-col gap-8 max-w-5xl">
      <Text className="text-3xl font-bold tracking-tight">ElevenLabs</Text>
      <Tabs
        defaultValue="conversation"
        orientation="horizontal"
        className="w-full flex flex-row gap-2"
      >
        <TabsList className="flex-col gap-2 bg-transparent py-0 h-max">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              disabled={tab.disabled}
              className="data-[state=active]:bg-muted w-full justify-start data-[state=active]:shadow-none"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="text-start grow">
          <TabsContent
            className="py-6 h-full border rounded-md animate-slide-in"
            value="conversation"
          >
            <Conversation />
          </TabsContent>
          <TabsContent
            value="text-to-speech"
            className="py-2 px-4 animate-slide-in"
          >
            <TextToSpeech />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
