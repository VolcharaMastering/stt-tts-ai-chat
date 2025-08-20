import { openai } from "../config/openAi";
import { requestError } from "../errors/errors";
import UsersChat from "../models/UsersChat";

export async function getGptResponse(userText: string, requestId: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: userText,
        },
      ],
    });

    if (!completion.choices || completion.choices.length === 0) {
      requestError("No response from OpenAI");
    }
    const responseContent = completion.choices[0].message.content ?? "";
    console.log(userText, requestId)
    await UsersChat.findByIdAndUpdate(requestId, {
      $set: { textMessage: userText, textAnswer: responseContent },
    }).exec();
    
    return responseContent;
  } catch (err: Error | any) {
    console.error("OpenAI error:", err);
    throw err;
  }
}