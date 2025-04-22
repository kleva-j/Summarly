import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { TextToSpeech } from "@/components/elevenlabs/text-to-speech";
import { Conversation } from "@/components/elevenlabs/conversation";
import { Text } from "@/components/ui/typography";

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
          <TabsTrigger
            value="conversation"
            className="data-[state=active]:bg-muted w-full justify-start data-[state=active]:shadow-none"
          >
            Conversational AI
          </TabsTrigger>
          <TabsTrigger
            value="text-to-speech"
            className="data-[state=active]:bg-muted w-full justify-start data-[state=active]:shadow-none"
          >
            Text to Speech
          </TabsTrigger>
        </TabsList>
        <div className="grow rounded-md border text-start">
          <TabsContent value="conversation" className="py-6">
            <Conversation />
          </TabsContent>
          {/* <TabsContent value="text-to-speech" className="py-2 px-4">
            <TextToSpeech />
          </TabsContent> */}
        </div>
      </Tabs>
    </section>
  );
}
