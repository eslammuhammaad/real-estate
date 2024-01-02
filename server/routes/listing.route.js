import express from "express";
import { verifyAuth } from "../utils/verifyAuth.js";
import { createListing, deleteListing, updateListing, getListing, getAllListing } from "../controllers/listing.controller.js";

const router= express.Router();

router.post("/create",verifyAuth,createListing);
router.delete("/delete/:id",verifyAuth,deleteListing);
router.post("/update/:id",verifyAuth,updateListing);
router.get("/get/:id",getListing);
router.get("/get",getAllListing)




export default router;