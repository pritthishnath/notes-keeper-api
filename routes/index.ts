import { Router } from "express";
import noteRoutes from "./note";
import tagRoutes from "./tag";
import publicRoutes from "./publicRoutes";
import { verifyUser } from "../middlewares/verifyUser";

const router = Router();

router.use("/note", verifyUser, noteRoutes);
router.use("/tag", tagRoutes);
router.use("/shared", publicRoutes);

router.get("/", (req, res) => {
  res.json({ message: "Keeper API service running" });
});

export default router;
