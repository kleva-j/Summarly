import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion";

const faq = [
  {
    question: "What audio formats does Summarly AI support?",
    answer:
      "You can use our built-in audio recorder, upload an audio file (mp3, mp4, mpeg, mpga, m4a, wav, webm), or paste in a YouTube link.",
  },
  {
    question: "What devices can I use Summarly AI on?",
    answer:
      "At the moment, Summarly AI is only available for download on the iOS App Store and Google Play Store. If you're interested in using Summarly AI on other platforms, reach out to us at support@summarly.ai.",
  },
  {
    question: "Can I use Summarly AI with Voice Memos or past recordings in other apps?",
    answer:
      "Yes, just download your audio files onto your device and upload them to Summarly AI.",
  },
  {
    question: "Are my notes, transcriptions, and recordings private?",
    answer:
      "Yes, privacy and security is our team's top priority. We will never sell your data or give unrelated access to any third-parties. You can also permanently delete your data at any time.",
  },
  {
    question: "Does Summarly AI support other languages or translations?",
    answer:
      "Yes, you can use Summarly AI with over 30+ language or dialect. Just let us know in the feedback form and we'll do our best to accommodate your request.",
  },
];

export const FAQ = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="flex flex-col md:flex-row items-start gap-x-12 gap-y-6">
        <div>
          <h2 className="text-4xl lg:text-5xl !leading-[1.15] font-bold tracking-tight">
            Frequently Asked <br /> Questions
          </h2>
          <p className="mt-1.5 text-lg text-muted-foreground max-w-md">
            Quick answers to common questions about our products and services.
          </p>
        </div>

        <Accordion type="single" defaultValue="question-0" className="max-w-xl">
          {faq.map(({ question, answer }, index) => (
            <AccordionItem key={question} value={`question-${index}`}>
              <AccordionTrigger className="text-left text-lg">
                {question}
              </AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
