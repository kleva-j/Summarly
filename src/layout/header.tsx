import { MobileMenu } from "@/layout/mobile-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { NavMenu } from "@/layout/nav-menu";
import { siteConfig } from "@/lib/config";
import { Logo } from "@/components/logo";

import Link from "next/link";

const signInLink = siteConfig.navigations.links["sign-in"];

export const Header = () => {
	return (
		<header>
			<nav className="h-16 bg-background border-b">
				<div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
					<Logo />
					{/* Desktop Menu */}
					<NavMenu className="hidden md:block" />
					<div className="flex items-center gap-3">
						<Button
							size="sm"
							variant="outline"
							className="hidden sm:inline-flex rounded-full cursor-pointer"
						>
							<Link href={signInLink.href}>Sign In</Link>
						</Button>
						<Button
							size="sm"
							className="rounded-full gap-3 cursor-pointer"
						>
							<Link href={signInLink.href}>Get Started</Link>
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
