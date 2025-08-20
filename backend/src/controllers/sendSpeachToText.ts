import fs from "fs";
import { notFound, requestError } from "../errors/errors";
import { assemblyai } from "../config/assemblyAi";

import { Request, Response, NextFunction } from "express";
import UsersChat from "../models/UsersChat";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const sendSpeachToText = async (req: MulterRequest, res: Response, next: NextFunction) => {
    try {
    if (!req.file) return notFound("Файл не найден");

    const { userName } = req.body;
    const transcript = await assemblyai.transcripts.transcribe({
      audio: fs.createReadStream(req.file.path),
    });

    if(!transcript.text){
      requestError("Транскрипция не удалась");
    }
    const transcriptedMessage = await new UsersChat({
      userName: userName,
      textMessage: transcript.text,
    }).save();
    
    res.json({ text: transcript.text });
  } catch (err: Error | any) {
    console.error(err);
    res.status(500).json({ error: `Ошибка транскрипции ${err.error.message}` });
  }
}