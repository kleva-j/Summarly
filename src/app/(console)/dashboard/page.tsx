import { Logo } from "@/components/logo";

export default function DashboardPage() {
  return (
    <section>
      <header className="h-14 bg-background border-b">
        <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
        </div>
      </header>
    </section>
  );
}
