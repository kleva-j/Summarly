"use server";

import type { BillingService, UsageRecord, UserCredits } from "@/types/billing";
import type { FeatureResponse as Feature } from "@/types/billing";

import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export class BillingServiceImpl implements BillingService {
  private features: Feature[] = [];

  constructor() {
    this.initialize();
  }

  protected async initialize() {
    this.features = await this.fetchFeatures();
  }

  fetchFeatures(): Promise<Feature[]> {
    return fetchQuery(api.subscription_plans.getAllFeatures);
  }

  async getUserCredits(): Promise<UserCredits> {
    const userCredits = await fetchQuery(
      api.subscription_plans.getUserCredits
    );

    return { ...userCredits, features: this.features, usageHistory: [] };
  }

  async useCredits() {}

  async deductCredits() {}

  async addCredits() {}

  async getUsageHistory(): Promise<UsageRecord[]> {
    return [];
  }

  async checkFeatureAccess(featureId: string): Promise<boolean> {
    const userCredits = await this.getUserCredits();
    const feature = this.features.find((f) => f._id === featureId);

    if (!feature) return false;

    return userCredits.availableCredits >= feature.creditCost;
  }

  async getFeaturePrice(featureId: string): Promise<number> {
    const feature = this.features.find((f) => f._id === featureId);
    if (!feature) throw new Error("Feature not found");
    return feature.creditCost;
  }
}

export const billingService = new BillingServiceImpl();
