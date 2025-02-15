import { Controls } from "@/components/hume/control";
import { Messages } from "@/components/hume/message";

export default function Page() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
				<Messages />
				<Controls />
			</div>
		</div>
	);
}
