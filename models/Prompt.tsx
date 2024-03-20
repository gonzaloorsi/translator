import { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
  prompt: { type: String, required: true, trim: true },
});

export const Prompt = models.Prompt || model("Prompt", promptSchema);
