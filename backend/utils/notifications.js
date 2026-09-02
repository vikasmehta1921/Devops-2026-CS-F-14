import Notification from "../models/Notification.js";
export async function notify(userId, title, message, type="general") {
  return Notification.create({user:userId,title,message,type});
}
