export interface Template {
  id: string;
  title: string;
  description: string;
  price: number;
  status: "PENDING" | "PUBLISHED" | "REJECTED";
  categoryId: string;
  category?: {
    id: string;
    name: string;
  };
  user?: {
    id: string;
    name: string;
    email: string;
  };
  demoUrl?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  media?: TemplateMedia[];
}


export interface TemplateMedia {
  id: string;
  type: "image" | "video";
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
}

export interface CreateTemplateData {
  title: string;
  description: string;
  categoryId: string;
  price: number;
  demoUrl?: string;
}

export interface UpdateTemplateData {
  title?: string;
  description?: string;
  categoryId?: string;
  price?: number;
  demoUrl?: string;
}