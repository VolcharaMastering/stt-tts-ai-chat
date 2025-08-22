import { Request, Response, NextFunction } from 'express';
import UsersChat, { IUserChat } from '../models/UsersChat';
import { notFound, serverError } from '../errors/errors';
import fs from 'fs';

import { transcribeAudio } from '../services/sttService';
import { getGptResponse } from '../services/aiService';
import { io } from '../../app';

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
    res.json({ textMessage: transcriptText });
    // 3. GPT response
    const aiAnswer = await getGptResponse(transcriptText, transcriptedMessage._id, voiceAnswer);

    // 4. Send audio response via socket.io
    if (voiceAnswer && aiAnswer.audioPath) {
      const audioBuffer = await fs.promises.readFile(aiAnswer.audioPath);
      io.to(userName).emit('gptAnswer', {
        text: aiAnswer.text,
        audio: audioBuffer.toString('base64'), // Send audio as base64 string
      });
    } else {
      // 4. Send text response via socket.io
      io.to(userName).emit('gptAnswer', {
        text: aiAnswer.text,
      });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      serverError(`Error processing: ${err.message}`);
    }
    serverError('Unknown error processing speech to text');
  }
};
