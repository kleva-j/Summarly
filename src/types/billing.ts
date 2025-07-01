import type { WithoutSystemFields } from "convex/server";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import type { Plan } from "@/convex/utils";

export type SubscriptionPlans = Doc<"subscription_plans">;
export type SubscriptionPlans_ = WithoutSystemFields<SubscriptionPlans>;

export type UsageHistoryResponse = Doc<"usageHistory">;
export type UsageHistoryType = WithoutSystemFields<UsageHistoryResponse>;

export type FeatureResponse = Doc<"features">;
export type FeatureType_ = WithoutSystemFields<FeatureResponse>;

export type CreditResponse = Doc<"credits">;
export type CreditType_ = WithoutSystemFields<CreditResponse>;

export type Prettify<T> = {
  [K in keyof T]: Prettify<T[K]>;
} & {};

export type PlanType = (typeof Plan)[keyof typeof Plan]; // also `${Plan}`

export type CreditType = {
  userId: string;
  amount: number;
  expiresAt?: Date;
  status: "active" | "expired" | "used";
  source: "subscription" | "purchase" | "free";
  metadata?: Record<string, unknown>;
};

export enum FeatureCategory {
  Playground = "playground",
  Hume = "hume",
  Elevenlabs = "elevenlabs",
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  creditCost: number;
  category: FeatureCategory;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}

export type UsageRecord = {
  id: string;
  userId: string;
  featureId: string;
  creditsUsed: number;
  timestamp: Date;
  metadata?: Record<string, unknown>;
};

export type UserCredits = {
  userId: Id<"users">;
  totalCredits: number;
  availableCredits: number;
  features: FeatureType_[];
  usageHistory: UsageHistoryType[];
  subscriptionStatus: `${Plan}`;
};

export interface BillingService {
  getUserCredits(userId: string): Promise<UserCredits>;
  deductCredits(featureId: string, amount: number): void;
  addCredits(
    userId: string,
    amount: number,
    source: CreditType["source"]
  ): void;
  getUsageHistory(userId: string): Promise<UsageRecord[]>;
  checkFeatureAccess(userId: string, featureId: string): Promise<boolean>;
  getFeaturePrice(featureId: string): Promise<number>;
}
