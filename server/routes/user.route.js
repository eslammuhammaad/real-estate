import express from "express";
import { updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyAuth } from "../utils/verifyAuth.js";

const router = express.Router();

router.post('/update/:id', verifyAuth ,updateUser);
router.delete('/delete/:id', verifyAuth ,deleteUser);


export default router;
