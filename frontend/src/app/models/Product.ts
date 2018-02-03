export interface Product {
  title: string;
  description: string;
  size: number;
  color: string;
  condition: string;
  curentBidPrice: number;
  currentAskPrice: number;
  quantity: number;
  sellerId: number;
  buyerId: number;
  categoryId: number;
  brand: string;
  createdAt: string;
  updatedAt: string;
  ProductPhotos?: any
}