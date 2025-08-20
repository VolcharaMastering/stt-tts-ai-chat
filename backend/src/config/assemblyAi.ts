import { AssemblyAI } from "assemblyai";

export const assemblyai = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY || "",
});