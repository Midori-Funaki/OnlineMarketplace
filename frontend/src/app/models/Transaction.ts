export interface Transaction {
    id:number,
    status: string,
    price: number,
    sellerShipAddress: string,
    sellerBillAddress: string,
    buyerShipAddress: string,
    buyerBillAddress: string,
    buyerFirstName: string,
    buyerLastName: string,
    buyerContact: string,
    buyerId: number,
    sellerId: number,
    productId?: {
        title: string,
        description: string,
        size: number,
        color: string,
        condition: string,
        curentBidPrice: number,
        currentAskPrice: number,
        quantity: number,
        sellerId: number,
        buyerId: number,
        categoryId: number,
        brand: string
    }
  }