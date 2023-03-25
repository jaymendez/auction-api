import { Transaction } from './transaction.interface';

export interface Lot {
  _id: string;
  userId: string;
  name: string;
  bids: Transaction[];
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
