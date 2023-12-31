/**
 * @route METHOD /note/:action
 */

import { Router } from "express";
import { IncomingNoteType, NoteModel } from "../models/Note";
import { jsonError, randomString } from "../utils";
import { IncomingTagType, TagModel } from "../models/Tag";

const router = Router();

/**
 * @desc 1. CRUD scope for notes
 */

router.post("/", async (req, res) => {
  const userId = req.query.userId;
  const { notes } = req.body;

  const allTags = notes.flatMap((note: IncomingNoteType) => note.tags);

  try {
    await NoteModel.bulkWrite(
      notes.map((note: IncomingNoteType) => {
        const updatedNote = {
          ...note,
          synced: true,
        };
        return {
          updateOne: {
            filter: { id: updatedNote.id, createdBy: userId },
            update: updatedNote,
            upsert: true,
          },
        };
      })
    );

    await TagModel.bulkWrite(
      allTags.map((tag: IncomingTagType) => {
        return {
          updateOne: {
            filter: { label: tag.label },
            update: {
              $set: { id: tag.id, synced: true },
            },
            upsert: true,
          },
        };
      })
    );

    res.sendStatus(200);
  } catch (error) {
    return jsonError(res, 500);
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.query.userId;
  try {
    const note = await NoteModel.findOne({
      id: req.params.id,
      createdBy: userId,
    });

    if (!note) return jsonError(res, 404, "Note not found");

    res.json(note);
  } catch (error) {
    return jsonError(res, 500);
  }
});

router.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({ createdBy: req.query.userId });

    res.json(notes);
  } catch (error) {
    return jsonError(res, 500);
  }
});

router.post("/:id", async (req, res) => {
  const userId = req.query.userId;
  const { title, markdown, tagIds, tags } = req.body;

  const newNoteData = {
    title,
    markdown,
    tagIds,
    synced: true,
  };
  try {
    const foundNote = await NoteModel.findOneAndUpdate(
      {
        id: req.params.id,
        createdBy: userId,
      },
      newNoteData,
      { upsert: true, returnDocument: "after" }
    );

    await TagModel.bulkWrite(
      tags.map((tag: IncomingTagType) => {
        return {
          updateOne: {
            filter: { label: tag.label },
            update: {
              $set: { id: tag.id, synced: true },
            },
            upsert: true,
          },
        };
      })
    );

    return res.json(foundNote);
  } catch (error) {
    console.log(error);
    return jsonError(res, 500);
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.query.userId;
  try {
    const foundNote = await NoteModel.findOneAndDelete({
      id: req.params.id,
      createdBy: userId,
    });

    if (!foundNote) return res.sendStatus(204);

    res.sendStatus(200);
  } catch (error) {
    return jsonError(res, 500);
  }
});

/**
 * @desc 2. Sharing scope for a note
 */

router.put("/:id/share", async (req, res) => {
  const userId = req.query.userId;
  const newPermalink = randomString(11);

  try {
    const foundNote = await NoteModel.findOne({
      id: req.params.id,
      createdBy: userId,
    });

    if (!foundNote) return jsonError(res, 404, "Note not found");

    if (foundNote.permalink && foundNote.permalink.length > 0) {
      return res.json({ permalink: foundNote.permalink });
    } else {
      await foundNote.updateOne({ permalink: newPermalink });

      return res.json({
        permalink: newPermalink,
      });
    }
  } catch (error) {
    return jsonError(res, 500);
  }
});

router.delete("/:id/share", async (req, res) => {
  const userId = req.query.userId;
  try {
    const foundNote = await NoteModel.findOne({
      id: req.params.id,
      createdBy: userId,
    });

    if (!foundNote) return res.sendStatus(204);

    await foundNote.updateOne({ permalink: "" });

    res.sendStatus(200);
  } catch (error) {
    return jsonError(res, 500);
  }
});

export default router;
