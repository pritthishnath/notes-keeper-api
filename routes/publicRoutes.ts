import { Router } from "express";
import { NoteModel } from "../models/Note";
import { jsonError } from "../utils";

const router = Router();

router.get("/:permalink", async (req, res) => {
  const permalink = req.params.permalink;
  try {
    const foundNote = await NoteModel.findOne({
      permalink: permalink,
    })
      .populate("tags")
      .select("-_id -id");

    if (!foundNote) return jsonError(res, 404, "Note not found");

    res.json(foundNote);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default router;
