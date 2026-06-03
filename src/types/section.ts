export interface CreateSection {
  title: string;
  description: string;
}

export interface UpdateSection {
  title?: string;
  description?: string;
}

export interface SectionResponse {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
