export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  shippingAddress: string;
  shippingAddress2: string;
  billingAddress: string;
  billingAddress2: string;
  contact:string;
  stripeId: string;
  createdAt: string;
  updatedAt: string;
}