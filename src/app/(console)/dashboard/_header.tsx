"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

import {
	BreadcrumbSeparator,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	Breadcrumb,
} from "@/components/ui/breadcrumb";

export const Header = () => {
	const [main, secondary] = usePathname().split("/").filter(Boolean);

	return (
		<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<SidebarTrigger className="-ml-1" />
			<Separator orientation="vertical" className="mr-2 h-4" />
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem className="hidden md:block">
						<BreadcrumbLink href="#" className="capitalize">
							{main}
						</BreadcrumbLink>
					</BreadcrumbItem>
					{secondary && (
						<>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage className="capitalize">
									{secondary}
								</BreadcrumbPage>
							</BreadcrumbItem>
						</>
					)}
				</BreadcrumbList>
			</Breadcrumb>

			<div className="ml-auto flex items-center gap-2">
				<ModeToggle />
			</div>
		</header>
	);
};
