import fs from 'fs';
import { assemblyai } from '../config/assemblyAi';
import { requestError, serverError } from '../errors/errors';

export async function transcribeAudio(filePath: string): Promise<string> {
  try {
    const transcript = await assemblyai.transcripts.transcribe({
      audio: fs.createReadStream(filePath),
    });

    if (!transcript.text) {
      requestError('Транскрипция не удалась');
    }

    return transcript.text ?? '';
  } catch (err) {
    serverError('Ошибка в STT сервисе');
    return '';
  }
}
