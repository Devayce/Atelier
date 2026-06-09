export interface Product {
  id: number;
  name: string;
  image: string;
  color: string;
  event: string;
  subcategory?: string;
  description?: string;
  isAvailable?: boolean;
}

export type Category = {
  name: string;
  subcategories?: string[];
};