import Review from "../models/Review.js";
import Booking from "../models/Booking.js";
import Property from "../models/Property.js";

async function updatePropertyRating(propertyId) {
  const stats = await Review.aggregate([
    { $match: { property: propertyId } },
    { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);
  const avg = stats.length > 0 ? Number(stats[0].avg.toFixed(1)) : 0;
  const count = stats.length > 0 ? stats[0].count : 0;
  await Property.findByIdAndUpdate(propertyId, { ratingAvg: avg, ratingCount: count });
}

export async function list(req, res) {
  res.json(
    await Review.find({ property: req.params.propertyId })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 })
  );
}

export async function create(req, res) {
  const b = await Booking.findOne({
    tenant: req.user._id,
    property: req.body.propertyId,
    status: "successful",
  });
  if (!b) return res.status(403).json({ message: "Only successful bookings can review" });
  const r = await Review.create({
    property: req.body.propertyId,
    user: req.user._id,
    rating: req.body.rating,
    comment: req.body.comment,
  });
  await updatePropertyRating(r.property);
  res.status(201).json(r);
}

export async function remove(req, res) {
  const r = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!r) return res.status(404).json({ message: "Review not found" });
  await updatePropertyRating(r.property);
  res.json({ message: "Deleted" });
}
