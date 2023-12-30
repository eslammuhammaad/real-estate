import mongoose from "mongoose";

const listingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
/**
 {
    "name": "test",
    "description": "test",
    "address": "test",
    "regularPrice": 600,
    "discountPrice":100,
    "bathrooms": 1,
    "bedrooms": 2,
    "furnished": true,
    "parking": false,
    "type": "rent",
    "offer": true,
    "imageUrls": ["sjsjs00","jdshjfdh"],
    "userRef": "hsdfhsdfhfg",
  }
 */