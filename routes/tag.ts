/**
 * @route METHOD /tag/:action
 */

import { Router } from "express";
import { TagModel } from "../models/Tag";
import { jsonError } from "../utils";

const router = Router();

/**
 * @desc 1. Read Only scope for tags
 */

router.get("/:id", async (req, res) => {
  try {
    const tag = await TagModel.findOne({ id: req.params.id });

    res.json(tag);
  } catch (error) {
    return jsonError(res, 500);
  }
});

router.get("/", async (req, res) => {
  try {
    const tags = await TagModel.find();

    res.json(tags);
  } catch (error) {
    return jsonError(res, 500);
  }
});

// router.delete("/:label", async (req, res) => {
//   try {
//     await TagModel.findOneAndDelete({
//       label: req.params.label,
//     });

//     res.sendStatus(200);
//   } catch (error) {
//     return jsonError(res, 500);
//   }
// });

export default router;
