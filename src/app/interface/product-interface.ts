export interface Product {
  disabled?: boolean
  _id?: string;
  code: string;
  name: string;
  description: string;
  category: string;
  urlImage: string;
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;
}
