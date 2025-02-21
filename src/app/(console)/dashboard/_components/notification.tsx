import { Bell } from "lucide-react";
import {
	CardDescription,
	CardHeader,
	CardTitle,
	Card,
} from "@/components/ui/card";

export const Notifications = () => {
	return (
		<Card className="col-span-4 lg:col-span-3">
			<CardHeader>
				<CardTitle>Feels lonely here</CardTitle>
				<CardDescription>
					You have no notifications. If you had notifications, there would be a{" "}
					<Bell className="h-4 w-4 inline-block" /> icon right next to the
					&quot;Notifications&quot; tab.
				</CardDescription>
			</CardHeader>
		</Card>
	);
};
