import { MobileMenu } from "@/layout/mobile-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { NavMenu } from "@/layout/nav-menu";

export const Header = () => {
	return (
		<header>
			<nav className="h-16 bg-background border-b">
				<div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
					<h1 className="text-xl font-medium">Summarly<small className="text-muted-foreground">.AI</small></h1>
					{/* Desktop Menu */}
					<NavMenu className="hidden md:block" />
					<div className="flex items-center gap-3">
						<Button
							size="sm"
							variant="outline"
							className="hidden sm:inline-flex rounded-lg"
						>
							Sign In
						</Button>
						<Button className="rounded-lg gap-3" size="sm">
							Get Started
							<ArrowUpRight />
						</Button>
						{/* Mobile Menu */}
						<div className="md:hidden">
							<MobileMenu />
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};
