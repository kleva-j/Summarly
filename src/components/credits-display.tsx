import { useCreditsContext } from "@/providers/CreditsProvider";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export function CreditsDisplay() {
  const { credits, isLoading, error } = useCreditsContext();

  if (isLoading) {
    return <div className="animate-pulse">Loading credits...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!credits) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <span className="text-xl font-bold">{credits.availableCredits}</span>
      <span className="text-sm text-gray-600 dark:text-gray-400">Credits</span>
      <div className="flex-1" />
      <Button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        <Link href="/billing">Add Credits</Link>
      </Button>
    </div>
  );
}
