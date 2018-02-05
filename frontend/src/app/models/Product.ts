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
<<<<<<< HEAD
  createdAt: Date;
  updatedAt: Date;
  brand: string;
=======
  brand: string;
  createdAt: string;
  updatedAt: string;
  ProductPhotos?: any
>>>>>>> b05d1b7a98adaee764d30d9f8b4c834fed8f5387
}