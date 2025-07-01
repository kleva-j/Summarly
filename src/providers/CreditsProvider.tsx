import type { UserCredits } from "@/types/billing";
import type { ReactNode } from "react";

import { createContext, useContext } from "react";
import { useCredits } from "@/hooks/useCredits";
import { useUser } from "@clerk/nextjs";

interface CreditsContextType {
  credits: UserCredits | null;
  isLoading: boolean;
  error: string | null;
  checkFeatureAccess: (featureId: string) => Promise<boolean>;
  useCredits: (featureId: string, amount: number) => Promise<boolean>;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export function CreditsProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();

  const creditsData = user
    ? useCredits(user)
    : {
        credits: null,
        isLoading: false,
        error: null,
        checkFeatureAccess: async () => false,
        useCredits: async () => false,
      };

  return (
    <CreditsContext.Provider value={creditsData}>
      {children}
    </CreditsContext.Provider>
  );
}

export function useCreditsContext() {
  const context = useContext(CreditsContext);
  if (context === undefined) {
    throw new Error("useCreditsContext must be used within a CreditsProvider");
  }
  return context;
}
