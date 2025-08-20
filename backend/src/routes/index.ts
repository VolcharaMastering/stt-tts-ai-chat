import express, { Request, Response, NextFunction } from "express";

import multer from "multer";
import { validateMessage } from "../middlewares/validateMessge";
import { addMessageByUser } from "../controllers/addMessageByUser";
import { sendSpeachToText } from "../controllers/sendSpeachToText";


const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/messages/text", validateMessage, addMessageByUser);
router.post("/stt", upload.single("audio"), sendSpeachToText);
// router.post("/tts", sendTextToSpeach);
// router.get("/messages", getMessages);

// router.get("/requests/", getSupportRequests);

export default router;
