import express from "express";
import { verifyAuth } from "../utils/verifyAuth.js";
import { createListing, deleteListing, updateListing, getListing } from "../controllers/listing.controller.js";

const router= express.Router();

router.post("/create",verifyAuth,createListing);
router.delete("/delete/:id",verifyAuth,deleteListing);
router.post("/update/:id",verifyAuth,updateListing);
router.get("/get/:id",getListing);




export default router;