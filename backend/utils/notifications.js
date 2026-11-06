import Notification from "../models/Notification.js";

export async function notify(userId, title, message, type = "general") {
  if (!userId) return null;
  try {
    return await Notification.create({ user: userId, title, message, type });
  } catch (err) {
    console.error("Failed to send notification:", err.message);
    return null;
  }
}
