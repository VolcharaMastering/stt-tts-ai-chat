import { openai } from "../config/openAi";
import fs from "fs";
import UsersChat from "../models/UsersChat";

export const tts = async (text: string, responseId: string): Promise<any> => {
    try { 
    const speech = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: text,
    });

    const buffer = Buffer.from(await speech.arrayBuffer());
    const fileName = `uploads/tts-${Date.now()}.mp3`;
    fs.writeFileSync(fileName, buffer);
    await UsersChat.findByIdAndUpdate(responseId, {
      $set: { answerUrl: fs.existsSync(fileName) ? fileName : "" },
    }).exec();
    return speech;
} catch (err: Error | any) {
    console.error("TTS error:", err);
    throw new Error(`Text-to-speech conversion failed: ${err.message}`);
  }
}
