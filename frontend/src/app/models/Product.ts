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
  createdAt: string;
  updatedAt: string;
  ProductPhotos?: any
}