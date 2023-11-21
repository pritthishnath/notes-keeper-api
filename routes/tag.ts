/**
 * @route METHOD /tag/:action
 */

import { Router } from "express";
import { TagModel, TagType } from "../models/Tag";

const router = Router();

/**
 * @desc 1. CRUD scope for tags
 */

router.get("/:id", async (req, res) => {
  try {
    const tag = await TagModel.findOne({ _id: req.params.id });

    res.json(tag);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  try {
    const tags = await TagModel.find();

    res.json(tags);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete("/:label", async (req, res) => {
  try {
    await TagModel.findOneAndDelete({
      label: req.params.label,
    });

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default router;
