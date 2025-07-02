import type { WebhookEvent } from "@clerk/backend";
import type { SessionStatus } from "./utils";

import { httpRouter } from "convex/server";
import { Webhook } from "svix";

import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { getTokenId, Plan } from "./utils";

function ensureEnvironmentVariable(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`missing environment variable ${name}`);
  }
  return value;
}

const webhookSecret = ensureEnvironmentVariable("CLERK_WEBHOOK_SECRET");

const handleClerkWebhook = httpAction(async (ctx, request) => {
  const event = await validateRequest(request);
  if (!event) {
    return new Response("Error occured", { status: 400 });
  }

  switch (event.type) {
    case "user.created": {
      const { first_name, last_name, id, email_addresses } = event.data;

      if (email_addresses && email_addresses.length > 0) {
        const { email_address, verification } = email_addresses[0];
        await ctx.runMutation(internal.users.createUser, {
          isVerified: verification?.status === "verified",
          name: `${first_name} ${last_name}`,
          tokenIdentifier: getTokenId(id),
          email: email_address,
        });

        const freePlan = await ctx.runQuery(
          internal.subscription_plans.getSubscriptionPlans,
          { name: Plan.Free }
        );

        if (!freePlan) {
          return new Response(`${Plan.Free} plan not found`, { status: 400 });
        }

        await ctx.runAction(internal.clerk.updateMetadata, {
          id,
          metadata: { planId: freePlan._id },
        });
      } else {
        return new Response("No email addresses found", { status: 400 });
      }

      break;
    }
    case "user.updated": {
      const { first_name, last_name, id } = event.data;

      await ctx.runMutation(internal.users.updateUser, {
        tokenIdentifier: getTokenId(id),
        name: `${first_name} ${last_name}`,
      });
      break;
    }
    case "user.deleted": {
      if (!event.data.id) {
        return new Response("Missing user ID in event data", { status: 400 });
      }
      const id = getTokenId(event.data.id);
      await ctx.runMutation(internal.users.deleteUser, { id });
      break;
    }
    case "session.created":
    case "session.removed":
    case "session.revoked":
    case "session.ended": {
      const { data } = event;

      await ctx.runMutation(internal.sessions.createOrUpdate, {
        userId: data.user_id,
        sessionId: data.id,
        clientId: data.client_id,
        expireAt: data.expire_at,
        status: data.status as SessionStatus,
        lastActiveAt: data.last_active_at,
      });
      break;
    }
    default: {
      console.log("ignored Clerk webhook event", event.type);
    }
  }
  return new Response(null, { status: 200 });
});

const http = httpRouter();
http.route({
  path: "/clerk-convex-webhook",
  method: "POST",
  handler: handleClerkWebhook,
});

async function validateRequest(
  req: Request
): Promise<WebhookEvent | undefined> {
  const payloadString = await req.text();

  const svixId = req.headers.get("svix-id");
  const svixTimestamp = req.headers.get("svix-timestamp");
  const svixSignature = req.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    console.error("Missing required webhook headers");
    return;
  }

  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixTimestamp,
    "svix-signature": svixSignature,
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;
  try {
    evt = wh.verify(payloadString, svixHeaders) as Event;
  } catch (error) {
    console.log("error verifying", error);
    return;
  }

  return evt as unknown as WebhookEvent;
}

export default http;
