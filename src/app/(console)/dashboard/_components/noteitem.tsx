"use client";

import type { Note, NoteId } from "@/model/types";

import { MoreVertical, Notebook, Trash2, Pen } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialog,
} from "@/components/ui/alert-dialog";

type NoteItemProps = Note & {
  selected: boolean;
  handleDelete: () => void;
  onClick: (noteId: NoteId) => void;
};

export const NoteItem = (props: NoteItemProps) => {
  const { _id, title, onClick, selected, handleDelete, status } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      exit={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.6, type: "spring" }}
      className={cn(
        "relative flex flex-col p-4 gap-2 group rounded-xl border bg-card text-card-foreground shadow-sm cursor-pointer h-min max-w-sm min-w-[280px] hover:bg-sky-400/5",
        selected && "border-blue-800/50"
      )}
      onClick={() => onClick(_id)}
    >
      <div className="flex items-center justify-between gap-2">
        <Button className="p-2 rounded-full size-9">
          <Notebook className="text-gray-300 dark:text-gray-700" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="text-gray-500 size-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem className="cursor-pointer">
              <Pen className="size-4 text-gray-400" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <Trash2 className="size-4 text-red-400" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Text
        as="h4"
        className={cn(
          "text-base font-medium line-clamp-1 !m-0",
          selected && "text-blue-700"
        )}
      >
        {title || "Lorem ipsum dolor sit amet consectet."}
      </Text>

      <Text className={cn("text-sm line-clamp-2 !m-0 text-muted-foreground")}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem dicta
        illo, vero saepe ullam amet sed veritatis ad laboriosam exercitationem
        sapiente eos deleniti sunt nobis maxime nam. Hic, blanditiis quia!
      </Text>

      <div className="flex items-center justify-between gap-2 mt-2">
        <Badge className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 shadow-none rounded-full capitalize">
          <div className="size-1.5 rounded-full bg-amber-500 mr-2" />
          {status}
        </Badge>
        <small className="cursor-pointer text-xs text-muted-foreground">
          Updated: 2 days ago
        </small>
      </div>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="w-[350px] p-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
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
              // onClick={() => setIsOpen(false)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};
