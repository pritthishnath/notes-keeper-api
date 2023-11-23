import { Router } from "express";
import { NoteModel } from "../models/Note";

const router = Router();

router.get("/:permalink", async (req, res) => {
  const permalink = req.params.permalink;
  try {
    const foundNote = await NoteModel.findOne({
      permalink: permalink,
    })
      .populate("tags")
      .select("-_id -id");

    if (!foundNote) return res.sendStatus(404);

    res.json(foundNote);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default router;
