import { SectionCollection } from '../database/models/section.js';
import { CreateSection, UpdateSection } from '../types/section.js';

export const getSection = async () => {
  return SectionCollection.find();
};

export const getSectionById = async (id: string) => {
  return SectionCollection.findById(id);
};

export const createSection = async (body: CreateSection) => {
  return SectionCollection.create(body);
};

export const updateSection = async (id: string, body: UpdateSection) => {
  return SectionCollection.findByIdAndUpdate(id, body, { new: true });
};

export const deleteSection = async (id: string) => {
  return SectionCollection.findByIdAndDelete(id);
};
