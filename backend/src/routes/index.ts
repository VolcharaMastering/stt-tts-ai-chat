import express, { Request, Response, NextFunction } from "express";
import { notFound } from "../errors/errors";
import { validateMessage } from "../middlewares/validateMessge";
import { addMessageByUser } from "../controllers/addMessageByUser";

const router = express.Router();

router.post("/messages/text", validateMessage, addMessageByUser);
// router.get("/requests/", getSupportRequests);


router.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(notFound("Page not found"));
});

export default router;
