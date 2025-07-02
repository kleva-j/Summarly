import type { UserCredits } from "@/types/billing";
import type { UserResource } from "@clerk/types";

import { billingService } from "@/services/billing";
import { useState, useEffect } from "react";

export function useCredits(user: UserResource | null) {
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const useFeatureCredits = async (): Promise<boolean> => {
    if (!user) return false;
    try {
      await billingService.useCredits();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to use credits");
      return false;
    }
  };

  useEffect(() => {
    if (!user) return;

    const loadCredits = async () => {
      try {
        const userCredits = await billingService.getUserCredits();
        setCredits(userCredits);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load credits");
      } finally {
        setIsLoading(false);
      }
    };

    loadCredits();
  }, [user]);

  const checkFeatureAccess = async (featureId: string): Promise<boolean> => {
    if (!user) return false;
    return credits?.features.some((f) => f.name === featureId) ?? false;
  };

  return {
    credits,
    isLoading,
    error,
    checkFeatureAccess,
    useCredits: useFeatureCredits,
  };
}
