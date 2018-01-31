export interface Product {
  title: string;
  description: string;
  size: number;
  color: string;
  condition: string;
  curentBidPrice: number;
  currentAskPrice: number;
  quantity: number;
  photos: {
    default?: string[];
    upload?: string[];
  };
  sellerId: number;
  buyerId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}