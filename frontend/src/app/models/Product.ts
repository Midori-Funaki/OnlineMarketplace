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
  createdAt: string;
  updatedAt: string;
  ProductPhotos?: any
>>>>>>> ddbbb6d168f0b3aa92b061f013086883d2cf2ec1
}