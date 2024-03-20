"use server";

import { Prompt } from "@/models/Prompt";
import connectDB from "@/db/connect";
import { HfInference } from "@huggingface/inference";
import { revalidatePath } from "next/cache";

export async function generate(formData: FormData) {
  const rawData = {
    prompt: formData.get("prompt"),
  };

  const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

  const res = await hf.translation({
    model: "t5-base",
    inputs: (rawData.prompt as string) || "",
  });

  await connectDB();
  const newEntry = await Prompt.create({
    prompt: (res as any)["translation_text"],
  });

  console.log(newEntry);
  revalidatePath("/");
}
