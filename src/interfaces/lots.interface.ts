export interface Lot {
  _id: string;
  name: string;
  bids: Bid[];
  startingPrice: number;
  status: string;
  auctionTime: AuctionTime;
}

export interface Bid {
  userId: string;
  price: number;
}

export interface AuctionTime {
  startTime: string;
  endTime: string;
}
