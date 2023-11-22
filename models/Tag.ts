import { Schema, Types, model } from "mongoose";

const TagSchema = new Schema({
  id: { type: String, unqiue: true, required: true },
  label: String,
  synced: Boolean,
});

export type TagType = {
  id: string;
  label: string;
  synced: boolean;
};

export type IncomingTagType = {
  id: string;
  label: string;
  synced: boolean;
};

export const TagModel = model<TagType>("tag", TagSchema);
