import { connectToDb } from "@/utils/database";
import Prompt from "@/models/prompt";

// GET to read

export const GET = async (request: any, { params }: any) => {
  try {
    await connectToDb();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

// PATCH to update

export const PATCH = async (request: any, { params }: any) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDb();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

// DELETE to delete

export const DELETE = async (request: any, { params }: any) => {
  try {
    await connectToDb();

    const prompt = await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Prompt not deleted successfully", { status: 500 });
  }
};
