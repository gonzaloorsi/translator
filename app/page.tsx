import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generate } from "./actions";
import { Prompt } from "@/models/Prompt";
import connectDB from "@/db/connect";
import { revalidatePath } from "next/cache";

export default async function page() {
  connectDB();

  const translations = await Prompt.find({});
  revalidatePath("/");

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Text to Image App
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Transform your text into stunning images with the power of AI.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2" action={generate}>
              <Input
                className="max-w-lg flex-1"
                placeholder="Enter your text"
                type="text"
                name="prompt"
              />
              <Button type="submit">Create</Button>
            </form>
          </div>
          <div>
            <h2>Respuestas</h2>
            {translations.map((translation, index) => (
              <p key={index}>{translation.prompt}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
