export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  isSelfOperated?: boolean;
  comments?: string;
  tags?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}