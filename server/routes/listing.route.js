import express from "express";
import { verifyAuth } from "../utils/verifyAuth.js";
import { createListing } from "../controllers/listing.controller.js";

const router= express.Router();

router.post("/create",verifyAuth,createListing);

export default router;