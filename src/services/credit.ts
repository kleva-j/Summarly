import type { CreditType } from "@/types/billing";

import { type CreditEntity, Command, CreditManager } from "@/entities";

export function addCreditCommand(credit: CreditEntity) {
  return new Command((credits: Map<string, CreditType>) => {
    credits.set(credit._id, credit);
    return `You have successfully added ${credit.amount} credits (${credit._id})`;
  });
}

export function removeCreditCommand(id: string) {
  return new Command((credits: Map<string, CreditType>) => {
    credits.delete(id);
    return `You have successfully removed ${id} credits`;
  });
}

export const creditManager = new CreditManager(new Map<string, CreditType>());
