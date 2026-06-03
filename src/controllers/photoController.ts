import { RequestHandler } from 'express';
import * as photoServices from '../services/photoService.js';

import { UserDocument } from '../database/models/user.js';
import createHttpError from 'http-errors';
import { CreatePhoto, UpdatePhoto } from '../types/photo.js';

export const getPhotos: RequestHandler = async (req, res, next) => {
  const { sectionId } = req.query;
  try {
    const photos = await photoServices.getPhotos(sectionId as string);
    res.status(200).json(photos);
  } catch (error) {
    next(error);
  }
};
export const getPhotoById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const photo = await photoServices.getPhotoById(id);
    if (!photo) return next(createHttpError(404, 'Photo not found'));
    res.status(200).json(photo);
  } catch (error) {
    next(error);
  }
};

export const createPhoto: RequestHandler = async (req, res, next) => {
  const user = req.user as UserDocument;
  const body = req.body as CreatePhoto;
  try {
    if (user.role !== 'admin') {
      return next(createHttpError(403, 'Forbidden'));
    }
    const photo = await photoServices.createPhoto(body);
    res.status(201).json(photo);
  } catch (error) {
    next(error);
  }
};

export const updatePhoto: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const user = req.user as UserDocument;
  const body = req.body as UpdatePhoto;
  try {
    if (user.role !== 'admin') {
      return next(createHttpError(403, 'Forbidden'));
    }
    const photo = await photoServices.updatePhoto(id, body);
    if (!photo) return next(createHttpError(404, 'Photo not found'));
    res.status(200).json(photo);
  } catch (error) {
    next(error);
  }
};

export const deletePhoto: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const user = req.user as UserDocument;
  try {
    if (user.role !== 'admin') {
      return next(createHttpError(403, 'Forbidden'));
    }
    const photo = await photoServices.deletePhoto(id);
    if (!photo) return next(createHttpError(404, 'Photo not found'));
    res.status(200).json(photo);
  } catch (error) {
    next(error);
  }
};
