import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { recentSales } from "@/lib/constants";

export function RecentSales() {
	return (
		<div className="space-y-8">
			{recentSales.map((item) => (
				<div className="flex items-center gap-4" key={item.email}>
					<Avatar className="h-9 w-9">
						<AvatarImage src={item.src} alt={item.alt} />
						<AvatarFallback>{item.fallback}</AvatarFallback>
					</Avatar>
					<div className="flex flex-1 flex-wrap items-center justify-between">
						<div className="space-y-1">
							<p className="text-sm font-medium leading-none">{item.name}</p>
							<p className="text-sm text-muted-foreground">{item.email}</p>
						</div>
						<div className="font-medium">{item.amount}</div>
					</div>
				</div>
			))}
		</div>
	);
}
