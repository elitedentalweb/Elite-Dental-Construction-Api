import { HydratedDocument, InferSchemaType, Schema, model } from 'mongoose';

const photoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    urls: {
      type: [String],
      required: true,
      default: [],
    },
    sectionId: {
      type: Schema.Types.ObjectId,
      ref: 'sections',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export type Photo = InferSchemaType<typeof photoSchema>;
export type PhotoDocument = HydratedDocument<Photo>;

export const PhotoCollection = model<Photo>('photos', photoSchema);
