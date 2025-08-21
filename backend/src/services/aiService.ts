import { ttsClient } from '../config/googleTts';
import { openai } from '../config/openAi';
import { requestError } from '../errors/errors';
import UsersChat from '../models/UsersChat';
import fs from 'fs/promises';
import path from 'path';

export const getGptResponse = async (userText: string, requestId: string, voiceAnswer?: boolean): Promise<{ text: string; audioPath?: string }> => {
  try {
    // 1. gen the answer
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: userText }],
    });
    if (!completion.choices?.length) {
      requestError('No response from OpenAI');
    }

    const responseContent = completion.choices[0].message.content ?? '';

    let audioFilePath: string | undefined = undefined;

    // 2. If voiceAnswer, use Google TTS
    if (voiceAnswer) {
      const [ttsResponse] = await ttsClient.synthesizeSpeech({
        input: { text: responseContent },
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'MP3' },
      });

      if (!ttsResponse.audioContent) {
        requestError('Google TTS failed');
      }

      // path to save audio file
      audioFilePath = path.join('uploads', `${requestId}.mp3`);
      await fs.writeFile(audioFilePath, ttsResponse.audioContent as Buffer);
    }

    // 3. save user message and response to the database
    await UsersChat.findByIdAndUpdate(requestId, {
      $set: {
        textMessage: userText,
        textAnswer: responseContent,
        answerUrl: audioFilePath,
      },
    }).exec();

    // 4. return response
    return { text: responseContent, audioPath: audioFilePath };
  } catch (err: unknown) {
    if (err instanceof Error) {
      requestError(`OpenAI/Google TTS failed: ${err.message}`);
    }
    throw err;
  }
};

//**This function is for the work with gpt-4 but all audio translation are not free */
// if (voiceAnswer) {
//   const audioData = await tts(userText, requestId); // ttsService returns ArrayBuffer

//   if (!audioData) {
//     requestError('Failed to generate audio response');
//     return ''; // shut up TS
//   }

//   // ArrayBuffer → Buffer
//   const buffer = Buffer.from(audioData);

//   // Save audio file
//   const filePath = path.join('uploads', `${requestId}.mp3`);
//   await fs.writeFile(filePath, buffer);

//   //update UsersChat with the path to the audio file
//   await UsersChat.findByIdAndUpdate(requestId, { voiceAnswerPath: filePath }).exec();

//   // return path to the audio file
//   return filePath;
// }
