export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  productCount: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryId: string;
  imageUrl: string;
  images: string[];
  moq: number;
  moqUnit: string;
  origin: string;
  packaging: string;
  specifications: Record<string, string>;
  featured: boolean;
  tagline: string;
}

export interface Inquiry {
  id?: string;
  name: string;
  country: string;
  quantity: number;
  message: string;
  productId: string;
  productName: string;
  createdAt?: string;
}

export interface Founder {
  name: string;
  title: string;
  phone: string;
  email: string;
  image: string;
}
