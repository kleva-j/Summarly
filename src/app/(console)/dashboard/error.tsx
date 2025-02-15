"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export interface DashboardErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

/**
 * A fallback component to display when an error occurs within the
 * dashboard.
 */
export default function DashboardError({ error, reset }: DashboardErrorProps) {
	useEffect(() => {
		// Optionally log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<main className="flex h-full flex-col items-center justify-center">
			<h2 className="text-center">Something went wrong!</h2>
			<Button
				className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
				onClick={() => reset()}
			>
				Try again
			</Button>
		</main>
	);
}
