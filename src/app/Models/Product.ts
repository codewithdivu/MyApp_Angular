
export interface Product {
    _id?: string; 
    name: string;
    description?: string;
    price: number;
    rating?: number;
    category: string;
    inStock?: boolean;
    quantity?: number;
    images: string[];
    createdAt?: Date;
    updatedAt?: Date;
    tags?: string[];
  }
  