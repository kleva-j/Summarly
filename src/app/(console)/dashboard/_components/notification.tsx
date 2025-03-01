import type { SharedProps } from "@/app/(console)/dashboard/_components/tabs";
import type { Doc } from "convex/_generated/dataModel";

import { Bell } from "lucide-react";
import {
	CardDescription,
	CardHeader,
	CardTitle,
	Card,
} from "@/components/ui/card";

type NotificationProps = SharedProps & { notifications: Doc<"notifs">[] };

const textHeading = "Feels lonely here";

export const Notifications = ({ notifications }: NotificationProps) => {
	return notifications.length > 0 ? (
		<div>Notifications</div>
	) : (
		<Card className="col-span-4 lg:col-span-3">
			<CardHeader>
				<CardTitle>{textHeading}</CardTitle>
				<CardDescription>
					You have no notifications. If you had notifications, there would be a{" "}
					<Bell className="h-4 w-4 inline-block" /> icon right next to the
					&quot;Notifications&quot; tab.
				</CardDescription>
			</CardHeader>
		</Card>
	);
};
