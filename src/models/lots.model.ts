import { Lot } from '@/interfaces/lots.interface';
import { Document, model, Schema } from 'mongoose';

const bidsSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    price: { type: Number, required: true },
  },
  { timestamps: true },
);

const lotSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    bids: [bidsSchema],
    auctionTime: {
      startTime: { type: Date },
      endTime: { type: Date },
    },
    startingPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['draft', 'published', 'ongoing', 'completed'],
      default: 'draft',
    },
  },
  { timestamps: true },
);

const lotModel = model<Lot & Document>('Lot', lotSchema);

export default lotModel;
