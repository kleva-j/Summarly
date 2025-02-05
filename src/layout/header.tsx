import { MobileMenu } from "@/layout/mobile-menu";
import { Button } from "@/components/ui/button";
import { NavMenu } from "@/layout/nav-menu";
import { Logo } from "@/components/logo";

export const Header = () => {
  return (
    <header>
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Logo />
          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
          <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden sm:inline-flex rounded-lg" size="sm">
              Sign In
            </Button>
            <Button className="rounded-lg" size="sm">
              Get Started
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
