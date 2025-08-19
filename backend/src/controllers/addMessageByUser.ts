import { unprocessableEntity } from "../errors/errors";
import { expressTypes } from "../middlewares/types";
import UsersChat from "../models/UsersChat";


export const addMessageByUser: expressTypes = async (req, res, next) => {
  try {
    const { userName, textMessage } = req.body;
    if (!userName || !textMessage) {
      unprocessableEntity( "User name and message are required");
    }
    const newUserMessage = await new UsersChat({
      userName,
      textMessage,
    }).save();
    // Here you would typically save the message to a database or perform some action
    // For demonstration, we will just return a success response
    res.status(201).json({
      message: "Message added successfully",
      data: { userName, textMessage },
    });
  } catch (error) {
    next(error);
  }
} 