"use client";

import type { PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

import {
	DialogDescription,
	DialogContent,
	DialogTrigger,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogClose,
	Dialog,
} from "@/components/ui/dialog";

export function MobileTimeline({ children }: PropsWithChildren) {
	const [hasReadToBottom, setHasReadToBottom] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	const handleScroll = () => {
		const content = contentRef.current;
		if (!content) return;

		const scrollPercentage =
			content.scrollTop / (content.scrollHeight - content.clientHeight);
		if (scrollPercentage >= 0.99 && !hasReadToBottom) {
			setHasReadToBottom(true);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Show Activity</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
				<DialogHeader className="contents space-y-0 text-left">
					<DialogTitle className="border-b px-6 py-4 text-base">
						Terms & Conditions
					</DialogTitle>
					<div
						ref={contentRef}
						onScroll={handleScroll}
						className="overflow-y-auto"
					>
						<DialogDescription asChild>
							<div className="px-6 py-4">
								<div className="[&_strong]:text-foreground space-y-4 [&_strong]:font-semibold">
									{children}
								</div>
							</div>
						</DialogDescription>
					</div>
				</DialogHeader>
				<DialogFooter className="border-t px-6 py-4 sm:items-center">
					{!hasReadToBottom && (
						<span className="text-muted-foreground grow text-xs max-sm:text-center">
							Read all terms before accepting.
						</span>
					)}
					<DialogClose asChild>
						<Button type="button" variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button type="button" disabled={!hasReadToBottom}>
							I agree
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
