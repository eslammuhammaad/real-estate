import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }
  if (req.user.id !== listing.userRef) {
    return next(
      errorHandler(403, "You are not authorized to delete this listing")
    );
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }
  if (req.user.id !== listing.userRef) {
    return next(
      errorHandler(403, "You are not authorized to delete this listing")
    );
  }
  try {
    const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const list = await Listing.findById(req.params.id);
    if (!list) {
      return next(errorHandler(404, "Listing not found"));
    }
    return res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
