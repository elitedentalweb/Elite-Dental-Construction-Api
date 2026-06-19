import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { UserDocument } from '../database/models/user.js';
import * as userService from '../services/userService.js';

export const getUsers: RequestHandler = async (req, res, next) => {
  const user = req.user as UserDocument;
  try {
    if (user.role !== 'admin') {
      return next(createHttpError(403, 'Forbidden'));
    }
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const approveUser: RequestHandler = async (req, res, next) => {
  const user = req.user as UserDocument;
  const { email } = req.body as { email: string };
  try {
    if (user.role !== 'admin') {
      return next(createHttpError(403, 'Forbidden'));
    }
    const updated = await userService.approveUser(email);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const user = req.user as UserDocument;
  const { email } = req.body as { email: string };
  try {
    if (user.role !== 'admin') {
      return next(createHttpError(403, 'Forbidden'));
    }
    const deleted = await userService.deleteUser(email);
    res.status(200).json(deleted);
  } catch (err) {
    next(err);
  }
};

export const setRole: RequestHandler = async (req, res, next) => {
  const user = req.user as UserDocument;
  const { email, role } = req.body as { email: string; role: 'user' | 'admin' };
  try {
    if (user.role !== 'admin') {
      return next(createHttpError(403, 'Forbidden'));
    }
    const updated = await userService.setUserRole(email, role);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};
