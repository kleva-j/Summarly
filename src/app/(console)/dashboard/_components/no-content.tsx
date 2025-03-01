import { Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";

interface NoContentProps {
	data: {
		textBody: string;
		actionLabel: string
		textHeading: string;
	};
	handleCreate: () => void;
}

export function NoContent({ handleCreate, data }: NoContentProps) {
	return (
		<Card className="bg-transparent flex flex-col text-center max-w-md items-center border p-6 rounded-md border-dashed shadow-none h-min mt-32 border-neutral-400 dark:border-neutral-800">
			<Text variant="h4" as="h4" className="">
				{data.textHeading}
			</Text>
			<Text variant="p" as="span" className="!mt-1 text-base mb-6">
				{data.textBody}
			</Text>
			<Button
				className="aspect-square max-sm:p-0 w-min rounded-lg cursor-pointer"
				onClick={handleCreate}
				variant="outline"
			>
				<PlusIcon
					className="opacity-60 sm:-ms-1"
					aria-hidden="true"
					size={16}
				/>
				<span className="max-sm:sr-only">{data.actionLabel}</span>
			</Button>
		</Card>
	);
}
