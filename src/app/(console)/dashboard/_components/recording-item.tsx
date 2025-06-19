"use client";

import type { Recording } from "@/model/types";

import { Button, buttonVariants } from "@/components/ui/button";
import { AudioLines, Play, Pause, Trash2 } from "lucide-react";
import { Text } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { useAudio } from "@/hooks/use-audio";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "@/components/ui/tooltip";

import {
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialog,
} from "@/components/ui/alert-dialog";

type Props = Recording & {
  onClick: (id: string) => void;
  selected: boolean;
};

export const RecordingItem = ({ id, title, selected, url, status }: Props) => {
  const { isPlaying, toggle } = useAudio({ src: url });

  return (
    <motion.div
      layout
      exit={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.6, type: "spring" }}
      className={cn(
        "relative flex flex-col p-4 gap-2 group rounded-lg border bg-card text-card-foreground shadow-sm cursor-pointer h-min max-w-sm min-w-[280px]",
        selected && "border-blue-800/50"
      )}
    >
      <div className="flex items-center gap-2">
        <Button variant="secondary" className="p-2 rounded-full size-9">
          <AudioLines className="text-muted-foreground" />
        </Button>
        <Text className="text-xs font-normal w-full truncate max-w-[200px] !m-0">
          Recording-{id}
        </Text>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                onClick={toggle}
                className={cn(
                  "size-9 rounded-full p-2 ml-auto cursor-pointer",
                  isPlaying && "animate-pulse border border-blue-700/50"
                )}
              >
                {isPlaying ? (
                  <Pause className="text-muted-foreground" />
                ) : (
                  <Play className="text-muted-foreground" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isPlaying ? "Pause" : "Play"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Text
        as="h4"
        className={cn(
          "text-sm font-normal !m-0 truncate line-clamp-1",
          selected && "text-blue-700"
        )}
      >
        {title ??
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quos."}
      </Text>

      <div className="border w-full border-dashed text-muted-foreground my-2" />

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <small className="text-xs text-muted-foreground">Status: </small>
          <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full capitalize">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2" />
            {status}
          </Badge>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash2 className="size-7 rounded-full p-1.5 ml-auto text-red-400 mr-1 hover:bg-muted" />
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[350px] p-4">
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this recording?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Take a moment to review the details provided to ensure you
                understand the implications.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className={cn(
                  buttonVariants({ variant: "destructive" }),
                  "cursor-pointer"
                )}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.div>
  );
};
