import { Schema, Types, model } from "mongoose";

const TagSchema = new Schema({
  id: String,
  label: String,
  synced: Boolean,
});

export type TagType = {
  _id?: string;
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
