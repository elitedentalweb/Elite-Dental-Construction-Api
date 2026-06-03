import { PhotoCollection } from '../database/models/photo.js';
import { SectionCollection } from '../database/models/section.js';
import { CreatePhoto, UpdatePhoto } from '../types/photo.js';

export const getPhotos = async (sectionId?: string) => {
  const query = sectionId ? { sectionId } : {};
  return PhotoCollection.find(query);
};

export const getPhotoById = async (id: string) => {
  return PhotoCollection.findById(id);
};

export const createPhoto = async (body: CreatePhoto) => {
  return PhotoCollection.create(body);
};

export const updatePhoto = async (id: string, body: UpdatePhoto) => {
  const photo = await PhotoCollection.findById(id);
  if (!photo) return null;

  if (body.title !== undefined) photo.title = body.title;
  if (body.url !== undefined) photo.url = body.url;
  if (body.description !== undefined) photo.description = body.description;
  if (body.sectionId !== undefined) {
    const sectionExists = await SectionCollection.exists({
      _id: body.sectionId,
    });
    if (!sectionExists) {
      throw new Error('Section not found');
    }
    photo.sectionId = body.sectionId as any;
  }
  const saved = await photo.save();

  return saved;
};

export const deletePhoto = async (id: string) => {
  return PhotoCollection.findByIdAndDelete(id);
};
