import Property from "../models/Property.js";
import Favorite from "../models/Favorite.js";
import History from "../models/History.js";
import User from "../models/User.js";

const pick = (body) => ({
  title: body.title,
  description: body.description,
  propertyType: body.propertyType,
  furnishing: body.furnishing,
  roomType: body.roomType,
  rent: Number(body.rent),
  deposit: Number(body.deposit || 0),
  bedrooms: Number(body.bedrooms || 1),
  bathrooms: Number(body.bathrooms || 1),
  city: body.city,
  state: body.state,
  locality: body.locality,
  pincode: body.pincode,
  address: body.address,
  location: body.location,
  amenities: body.amenities || [],
  images: body.images || [],
  availableFrom: body.availableFrom
});

const validateProperty = (body) => {
  const errors = [];

  if (!body.title || !body.title.trim()) {
    errors.push("Property title is required");
  }

  if (!body.city || !body.city.trim()) {
    errors.push("City is required");
  }

  if (!body.state || !body.state.trim()) {
    errors.push("State is required");
  }

  if (!body.rent || Number(body.rent) <= 0) {
    errors.push("Rent must be greater than 0");
  }

  return errors;
};

export async function list(req, res) {
  const {
    city,
    state,
    locality,
    propertyType,
    furnishing,
    minRent,
    maxRent,
    bedrooms,
    amenities,
    sort = "newest",
    page = 1,
    limit = 12
  } = req.query;

  const currentPage = Math.max(Number(page) || 1, 1);
  const currentLimit = Math.min(Math.max(Number(limit) || 12, 1), 50);

  const q = {
    status: { $ne: "rented" }
  };

  if (city) q.city = new RegExp(city, "i");
  if (state) q.state = new RegExp(state, "i");
  if (locality) q.locality = new RegExp(locality, "i");
  if (propertyType) q.propertyType = propertyType;
  if (furnishing) q.furnishing = furnishing;

  if (minRent || maxRent) {
    q.rent = {};

    if (minRent) q.rent.$gte = Number(minRent);
    if (maxRent) q.rent.$lte = Number(maxRent);
  }

  if (bedrooms) {
    q.bedrooms = {
      $gte: Number(bedrooms)
    };
  }

  if (amenities) {
    q.amenities = {
      $all: Array.isArray(amenities)
        ? amenities
        : amenities.split(",")
    };
  }

  const sortMap = {
    priceAsc: { rent: 1 },
    priceDesc: { rent: -1 },
    rating: { ratingAvg: -1 },
    popular: { views: -1 },
    newest: { createdAt: -1 }
  };

  const data = await Property.find(q)
    .populate("owner", "name phone email")
    .sort(sortMap[sort] || sortMap.newest)
    .skip((currentPage - 1) * currentLimit)
    .limit(currentLimit);

  const total = await Property.countDocuments(q);

  if (req.user && req.query.history) {
    await History.create({
      user: req.user._id,
      type: "search",
      query: JSON.stringify(req.query)
    });
  }

  res.json({
    data,
    total,
    page: currentPage,
    pages: Math.ceil(total / currentLimit)
  });
}

export async function getById(req, res) {
  if (!req.params.id) {
    return res.status(400).json({
      message: "Property ID is required"
    });
  }

  const p = await Property.findById(req.params.id)
    .populate("owner", "name phone email");

  if (!p) {
    return res.status(404).json({
      message: "Property not found"
    });
  }

  p.views = (p.views || 0) + 1;
  await p.save();

  if (req.user) {
    await History.create({
      user: req.user._id,
      type: "view",
      property: p._id
    });
  }

  res.json(p);
}

export async function mine(req, res) {
  const properties = await Property.find({
    owner: req.user._id
  }).sort({
    createdAt: -1
  });

  res.json(properties);
}

export async function create(req, res) {
  const errors = validateProperty(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Please correct the following errors",
      errors
    });
  }

  const property = await Property.create({
    ...pick(req.body),
    owner: req.user._id
  });

  res.status(201).json(property);
}

export async function update(req, res) {
  const errors = validateProperty(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Please correct the following errors",
      errors
    });
  }

  const p = await Property.findOne({
    _id: req.params.id,
    owner: req.user._id
  });

  if (!p) {
    return res.status(404).json({
      message: "Property not found or not owned by you"
    });
  }

  Object.assign(p, pick(req.body));

  await p.save();

  res.json(p);
}

export async function remove(req, res) {
  const p = await Property.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id
  });

  if (!p) {
    return res.status(404).json({
      message: "Property not found"
    });
  }

  res.json({
    message: "Property deleted successfully"
  });
}

export async function recommended(req, res) {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const q = {
    status: "available"
  };

  if (user.preferences?.city) {
    q.city = new RegExp(user.preferences.city, "i");
  }

  if (user.preferences?.propertyType) {
    q.propertyType = user.preferences.propertyType;
  }

  if (user.preferences?.furnishing) {
    q.furnishing = user.preferences.furnishing;
  }

  if (
    user.preferences?.minRent ||
    user.preferences?.maxRent
  ) {
    q.rent = {
      $gte: user.preferences.minRent || 0,
      $lte:
        user.preferences.maxRent ||
        Number.MAX_SAFE_INTEGER
    };
  }

  const props = await Property.find(q)
    .sort({
      ratingAvg: -1,
      views: -1
    })
    .limit(20);

  res.json(props);
}
