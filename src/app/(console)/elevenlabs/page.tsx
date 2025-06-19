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
    <section className="max-w-5xl mx-auto w-full p-4">
      <Text className="text-2xl font-semibold mb-8">ElevenLabs</Text>
      <Tabs
        defaultValue="conversation"
        orientation="horizontal"
        className="w-full flex h-max gap-2"
      >
        <TabsList className="flex-col gap-1 bg-transparent py-0 h-max">
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
        <div className="grow rounded-md border text-start">
          <TabsContent value="conversation" className="py-6">
            <Conversation />
          </TabsContent>
          <TabsContent value="text-to-speech" className="py-2 px-4">
            <TextToSpeech />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
