"use client";

import type { DateRange } from "react-day-picker";

import { DashboardStateContext } from "@/components/providers/dashboard";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { selectDateRange } from "@/components/selectors/dashboard";
import { SimpleRecordButton } from "@/components/simple-recorder";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DashboardStateActions } from "@/model/types";
import { Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { MicIcon } from "lucide-react";
import { toast } from "sonner";

import {
	DialogContent,
	DialogTrigger,
	DialogTitle,
	Dialog,
} from "@/components/ui/dialog";

const { SET_DATE_RANGE } = DashboardStateActions;

export const DashboardHeader = () => {
	const generateUploadUrl = useMutation(api.recording.generateUploadUrl);
	const analyseRecording = useMutation(api.recording.analyseRecording);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const dateRange = DashboardStateContext.useSelector(selectDateRange);

	const actorRef = DashboardStateContext.useActorRef();

	const setDateRange = useCallback(
		(date: DateRange | undefined) => {
			actorRef.send({ type: SET_DATE_RANGE, payload: date });
		},
		[actorRef],
	);

	async function handleRecording(audioBlob: Blob) {
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
	}

	return (
		<div className="flex md:items-center justify-between flex-col md:flex-row gap-4">
			<Text as="h2" className="text-3xl font-bold tracking-tight">
				Dashboard
			</Text>
			<div className="flex gap-2 items-center xs:items-center max-xs:space-y-4 xs:space-x-2 xs:flex-row">
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<Button className="p-2 size-10 rounded-md cursor-pointer">
							<MicIcon aria-hidden="true" size={24} />
						</Button>
					</DialogTrigger>
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
				<DateRangePicker setDateRange={setDateRange} dateRange={dateRange} />
			</div>
		</div>
	);
};
