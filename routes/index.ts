import { Router } from "express";
import noteRoutes from "./note";
import tagRoutes from "./tag";
import publicRoutes from "./publicRoutes";
import { verifyUser } from "../middlewares/verifyUser";

const router = Router();

router.use("/note", verifyUser, noteRoutes);
router.use("/tag", tagRoutes);
router.use("/shared", publicRoutes);

export default router;
