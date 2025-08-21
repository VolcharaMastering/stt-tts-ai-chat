import mongoose, { Document, Schema } from 'mongoose';

export interface IUserChat extends Document {
  _id: string;
  userName: string;
  textMessage: string;
  linkToAudio: string;
  date: Date;
  textAnswer: string;
  answerUrl: string;
}

const userChatSchema = new Schema({
  userName: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Minimum 2 characters'],
    maxlength: [120, 'Maximum 120 characters'],
  },
  textMessage: {
    type: String,
    required: [true, 'Message is required'],
    minlength: [2, 'Minimum 2 characters'],
    maxlength: [1000, 'Maximum 1000 characters'],
  },
  linkToAudio: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  textAnswer: {
    type: String,
    maxlength: [3000, 'Maximum 3000 characters'],
  },
  answerUrl: {
    type: String,
  },
});

export default mongoose.model<IUserChat>('UserChat', userChatSchema);
