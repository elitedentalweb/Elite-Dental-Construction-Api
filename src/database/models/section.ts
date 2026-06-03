import { HydratedDocument, InferSchemaType, Schema, model } from 'mongoose';

const sectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export type Section = InferSchemaType<typeof sectionSchema>;
export type SectionDocument = HydratedDocument<Section>;

export const SectionCollection = model<Section>('sections', sectionSchema);
