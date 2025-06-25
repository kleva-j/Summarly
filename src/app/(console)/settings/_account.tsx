"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserRound, Voicemail } from "lucide-react";
import { Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from "@/components/ui/form";

const formSchema = z.object({ email: z.string().email(), name: z.string() });

const defaultValues = { email: "", name: "" };

type FormSchema = z.infer<typeof formSchema>;

const resolver = zodResolver(formSchema);

export const Account = () => {
  const form = useForm<FormSchema>({ resolver, defaultValues });

  function onSubmit(values: FormSchema) {
    console.log(values);
  }

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  return (
    <div>
      <Text
        variant="h4"
        as="h4"
        className="text-lg font-medium mb-3 text-zinc-700 dark:text-zinc-300"
      >
        Account Details
      </Text>

      <div className="border rounded-sm max-w-sm p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onReset={onReset}
            className="space-y-8 @container"
          >
            <div className="grid grid-cols-12 gap-4">
              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 col-start-auto flex self-end flex-row gap-3 space-y-0 items-center">
                    <FormLabel className="flex shrink-0 text-muted-foreground font-medium">
                      Full Name:
                    </FormLabel>

                    <div className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            placeholder="Evil Rabbit"
                            className="ps-9"
                            type="text"
                            {...field}
                          />
                          <div
                            className={
                              "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center peer-disabled:opacity-50 start-0 ps-3"
                            }
                          >
                            <UserRound className="size-4" strokeWidth={1.75} />
                          </div>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
                name="name"
              />
              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 col-start-auto flex self-end flex-row gap-3 space-y-0 items-center">
                    <FormLabel className="flex shrink-0 text-muted-foreground font-medium">
                      Email Address:
                    </FormLabel>

                    <div className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            className="ps-9 placeholder:text-muted-foreground"
                            placeholder="example@acme.com"
                            type="text"
                            disabled
                            {...field}
                          />
                          <div
                            className={
                              "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center peer-disabled:opacity-50 start-0 ps-3"
                            }
                          >
                            <Voicemail
                              className="size-5 stroke-muted-foreground"
                              strokeWidth={1.5}
                            />
                          </div>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
                name="email"
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
