// import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { expressTypes } from './types';

export const validateMessage: expressTypes = (req, res, next) => {
  const schema = Joi.object({
    userName: Joi.string().min(2).max(120).required(),
    textMessage: Joi.string().min(2).max(1000).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  return next();
};
