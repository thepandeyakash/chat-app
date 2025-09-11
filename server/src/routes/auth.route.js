import express from "express";
import multer from 'multer';
import { signup, login, logout, checkAuth, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check", protectRoute, checkAuth);

router.put("/update-profile", protectRoute,upload.single('profilePic'), updateProfile);

export default router;