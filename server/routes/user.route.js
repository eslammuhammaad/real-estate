import express from "express";
import { updateUser, deleteUser, viewAllListings,getUser } from "../controllers/user.controller.js";
import { verifyAuth } from "../utils/verifyAuth.js";

const router = express.Router();

router.post('/update/:id', verifyAuth ,updateUser);
router.delete('/delete/:id', verifyAuth ,deleteUser);
router.get('/listings/:id', verifyAuth ,viewAllListings);
router.get('/:id', verifyAuth, getUser)




export default router;
