import { openai } from '../config/openAi';
import fs from 'fs';
import { requestError } from '../errors/errors';

export const tts = async (text: string, responseId: string) => {
  try {
    const speechResponse = await openai.audio.speech.create({
      model: 'gpt-4o-mini-tts',
      voice: 'alloy',
      input: text,
    });

    const arrayBuffer = await speechResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // проверяем и создаём папку uploads, если нет
    const dir = 'uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    const fileName = `${dir}/tts-${Date.now()}.mp3`;
    fs.writeFileSync(fileName, buffer);

    // return of mp3
    return arrayBuffer;
  } catch (err: Error | any) {
    console.error('TTS error:', err);
    requestError(`Text-to-speech conversion failed: ${err.error?.message || err.message}`);
  }
};
