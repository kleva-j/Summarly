import type { CreditType } from "@/types/billing";

export class CreditEntity implements CreditType {
  constructor(
    public _id: string,
    public userId: string,
    public amount: number,
    public createdAt: Date,
    public expiresAt: Date,
    public status: "active" | "expired" | "used",
    public source: "subscription" | "purchase" | "free",
    public metadata?: Record<string, unknown>
  ) {}
}

export class Command<T, U, R> {
  constructor(public execute: (menu: T, ...params: U[]) => R) {}
}

export class CreditManager {
  constructor(private credits: Map<string, CreditType>) {}

  public execute<U, R>(
    command: Command<Map<string, CreditType>, U, R>,
    ...args: U[]
  ): R {
    return command.execute(this.credits, ...args);
  }

  private getCredits(): CreditType[] {
    return Array.from(this.credits.values());
  }

  getCredit(id: string): CreditType | undefined {
    return this.credits.get(id);
  }

  getCreditByField(field: keyof CreditType, value: string): CreditType[] {
    return this.getCredits().filter((credit) => credit[field] === value);
  }
}
