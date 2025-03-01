import type { Id } from "./_generated/dataModel";

import { ConvexError, v } from "convex/values";

import { mutateWithUser, queryWithUser } from "./utils";
import { internalMutation } from "./_generated/server";
import { Notifs } from "./schema";

export const getLatest = queryWithUser({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async ({ db, identity }, { limit = 10 }) => {
    const { tokenIdentifier: userId } = identity;

    const unreadNotifications = await db
      .query("notifs")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("read"), false))
      .order("desc")
      .take(limit);

    return unreadNotifications;
  },
});

// Create a new notification
export const postNew = internalMutation({
  args: { ...Notifs.withoutSystemFields },
  handler: async ({ db }, { title, type, metadata, userId }) => {
    const notificationData = { userId, title, type, metadata, read: false };

    const userRecord = await db.get(userId as Id<"users">);

    if (!userRecord) throw new ConvexError("User not found");

    await db.insert("notifs", notificationData);
  },
});

// Get a single notification by id
export const getNotification = queryWithUser({
  args: { id: Notifs._id },
  handler: async ({ db, identity }, { id }) => {
    const { tokenIdentifier: userId } = identity;

    const notif = await db
      .query("notifs")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("_id"), id))
      .unique();

    return notif;
  },
});

// Mark a notification as read
export const markAsRead = mutateWithUser({
  args: { id: Notifs._id },
  handler: async ({ db, identity }, { id }) => {
    const { tokenIdentifier: userId } = identity;

    const notif = await db.get(id);

    if (!notif) throw new ConvexError("Notification not found");

    if (notif.userId !== userId) throw new ConvexError("Action Not Allowed");

    const metadata = { ...notif.metadata, updatedAt: new Date().getTime() };

    await db.patch(id, { read: true, metadata });
  },
});

export const markManyAsRead = mutateWithUser({
  args: { notificationIds: v.array(Notifs._id) },
  handler: async ({ db, identity }, { notificationIds }) => {
    const { tokenIdentifier: userId } = identity;

    for (const id of notificationIds) {
      const notif = await db.get(id);

      if (!notif) throw new ConvexError("Notification not found");

      if (notif.userId !== userId) throw new ConvexError("Action Not Allowed");

      const metadata = { ...notif.metadata, updatedAt: new Date().getTime() };

      await db.patch(id, { read: true, metadata });
    }
  },
});

export const toggleReadReceipt = mutateWithUser({
  args: { id: Notifs._id },
  handler: async ({ db, identity }, { id }) => {
    const { tokenIdentifier: userId } = identity;

    const notification = await db.get(id);

    if (!notification) throw new ConvexError("Notification not found");

    if (notification.userId !== userId)
      throw new ConvexError("Action Not Allowed");

    const metadata = { ...notification.metadata, updatedAt: new Date().getTime() };

    await db.patch(id, { read: !notification.read, metadata });
  },
});

// Delete a notification
export const remove = internalMutation({
  args: { id: Notifs._id, userId: v.string() },
  handler: async ({ db }, { id, userId }) => {
    const notification = await db.get(id);

    if (!notification) throw new ConvexError("Notification not found");

    if (notification.userId !== userId)
      throw new ConvexError("Action not allowed");

    return db.delete(id);
  },
});
