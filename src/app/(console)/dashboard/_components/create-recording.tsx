"use client";

import type { PropsWithChildren } from "react";

import { SimpleRecordButton } from "@/components/simple-recorder";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { MicIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
	DialogContent,
	DialogTrigger,
	DialogTitle,
	Dialog,
} from "@/components/ui/dialog";

export const CreateRecording = ({ children }: PropsWithChildren) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const generateUploadUrl = useMutation(api.recording.generateUploadUrl);
	const analyseRecording = useMutation(api.recording.analyseRecording);

	const handleRecording = async (audioBlob: Blob) => {
		setIsSubmitting(true);

		const postUrl = await generateUploadUrl();

		const result = await fetch(postUrl, {
			method: "POST",
			headers: { "Content-Type": audioBlob.type },
			body: audioBlob,
		});

		const { storageId } = await result.json();

		toast.promise(analyseRecording({ storageId }), {
			loading: "Loading...",
			success: () => {
				setIsOpen(false);
				return "Successfully Uploaded Recording";
			},
			error: "Error uploading recording",
			finally: () => setIsSubmitting(false),
		});
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="w-72">
				<VisuallyHidden>
					<DialogTitle>Add new recording</DialogTitle>
				</VisuallyHidden>
				<div className="shadow-none flex flex-col items-center border-none justify-center gap-y-6">
					<Button
						asChild
						variant="ghost"
						className="size-[80px] border-[10px] cursor-pointer rounded-full before:absolute before:-inset-1 before:block before:rounded-full before:bg-red-400"
					>
						<MicIcon aria-hidden="true" />
					</Button>

					<SimpleRecordButton
						isSubmitting={isSubmitting}
						submitRecording={handleRecording}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
};
