import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { UserDocument, UserCollection } from '../database/models/user.js';

export const getUsers: RequestHandler = async (req, res, next) => {
  const user = req.user as UserDocument;
  try {
    if (user.role !== 'admin') {
      return next(createHttpError(403, 'Forbidden'));
    }
    const users = await UserCollection.find();
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
    const updated = await UserCollection.findOneAndUpdate(
      { email },
      { isApproved: true },
      { new: true },
    );
    if (!updated) return next(createHttpError(404, 'User not found'));
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
    const deleted = await UserCollection.findOneAndDelete({ email });
    if (!deleted) return next(createHttpError(404, 'User not found'));
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
    const updated = await UserCollection.findOneAndUpdate(
      { email },
      { role },
      { new: true },
    );
    if (!updated) return next(createHttpError(404, 'User not found'));
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};
