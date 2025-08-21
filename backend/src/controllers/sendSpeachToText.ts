import { Request, Response, NextFunction } from 'express';
import UsersChat, { IUserChat } from '../models/UsersChat';
import { notFound, serverError } from '../errors/errors';
import fs from 'fs';

import { transcribeAudio } from '../services/sttService';
import { getGptResponse } from '../services/aiService';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const sendSpeachToText = async (req: MulterRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.file) return notFound('File not found');

    const { userName, voiceAnswer = false } = req.body;

    // 1. Recognize audio
    const originalPath = req.file.path;
    const newPath = `${originalPath}.mp3`;

    fs.renameSync(originalPath, newPath);

    const transcriptText = await transcribeAudio(newPath);
    // 2. Save user message
    const transcriptedMessage: IUserChat = await new UsersChat({
      userName,
      textMessage: transcriptText,
      linkToAudio: newPath,
    }).save();

    if (!transcriptedMessage || !transcriptedMessage._id || !transcriptText) {
      return notFound('Failed to save transcripted message');
    }
    //send response with transcripted text
    res.json({ text: transcriptText });
    // 3. GPT response
    const aiAnswer = await getGptResponse(transcriptText, transcriptedMessage._id, voiceAnswer);

    if (voiceAnswer && aiAnswer.audioPath) {
      const audioBuffer = await fs.promises.readFile(aiAnswer.audioPath);
      return res.set('Content-Type', 'audio/mpeg').set('Content-Disposition', 'attachment; filename="answer.mp3"').send(audioBuffer);
    }

    // 4. JSON
    return res.json({ text: transcriptText, aiText: aiAnswer.text });
  } catch (err: unknown) {
    if (err instanceof Error) {
      serverError(`Error processing: ${err.message}`);
    }
    serverError('Unknown error processing speech to text');
  }
};
