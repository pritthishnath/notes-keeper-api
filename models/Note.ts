import { Schema, Types, model } from "mongoose";
import { IncomingTagType } from "./Tag";

const NoteSchema = new Schema(
  {
    title: String,
    markdown: String,
    permalink: String,
    tagIds: [String],
    synced: Boolean,
    id: String,
    createdBy: { type: Types.ObjectId, ref: "user" },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

NoteSchema.virtual("tags", {
  ref: "tag",
  localField: "tagIds",
  foreignField: "id",
});

export type NoteType = {
  _id?: string;
  id: string;
  title: string;
  markdown: string;
  permalink: string;
  tagIds: string[];
  synced: boolean;
  createdBy: string;
};

export type IncomingNoteType = {
  tags: IncomingTagType[];
} & NoteType;

export const NoteModel = model<NoteType>("note", NoteSchema);
