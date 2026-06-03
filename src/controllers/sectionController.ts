import { RequestHandler } from 'express';
import * as sectionServices from '../services/sectionService.js';
import { UserDocument } from '../database/models/user.js';
import createHttpError from 'http-errors';
import { CreateSection, UpdateSection } from '../types/section.js';

export const getSections: RequestHandler = async (req, res, next) => {
  try {
    const sections = await sectionServices.getSection();
    res.status(200).json(sections);
  } catch (error) {
    next(error);
  }
};

export const getSectionById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const section = await sectionServices.getSectionById(id);
    if (!section) return next(createHttpError(404, 'Section not found'));
    res.status(200).json(section);
  } catch (error) {
    next(error);
  }
};

export const createSection: RequestHandler = async (req, res, next) => {
  const user = req.user as UserDocument;
  const body = req.body as CreateSection;
  try {
    if (user.role !== 'admin') {
      return next(createHttpError(403, 'Forbidden'));
    }
    const section = await sectionServices.createSection(body);
    res.status(201).json(section);
  } catch (error) {
    next(error);
  }
};

export const updateSection: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const user = req.user as UserDocument;
  const body = req.body as UpdateSection;
  try {
    if (user.role !== 'admin') {
      return next(createHttpError(403, 'Forbidden'));
    }
    const section = await sectionServices.updateSection(id, body);
    if (!section) return next(createHttpError(404, 'Section not found'));
    res.status(200).json(section);
  } catch (error) {
    next(error);
  }
};

export const deleteSection: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const user = req.user as UserDocument;
  try {
    if (user.role !== 'admin') {
      return next(createHttpError(403, 'Forbidden'));
    }
    const section = await sectionServices.deleteSection(id);
    if (!section) return next(createHttpError(404, 'Section not found'));
    res.status(200).json(section);
  } catch (error) {
    next(error);
  }
};
