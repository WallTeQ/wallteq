export interface CartTemplate {
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
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  templates: CartTemplate[];
  createdAt: string;
  updatedAt: string;
}