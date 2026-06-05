export interface CreatePhoto {
  title: string;
  description: string;
  urls: string[];
  sectionId: string;
}

export interface UpdatePhoto {
  title?: string;
  description?: string;
  urls?: string[];
  sectionId?: string;
}

export interface PhotoResponse {
  _id: string;
  title: string;
  description: string;
  urls: string[];
  sectionId: string;
  createdAt: Date;
  updatedAt: Date;
}
