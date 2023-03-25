import { Transaction } from '@/interfaces/transaction.interface';
import { Document, model, Schema } from 'mongoose';

const transactionSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    lotId: {
      type: Schema.Types.ObjectId,
      ref: 'Lot',
    },
    transactionAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['ongoing', 'closed', 'success'],
      default: 'ongoing',
    },
  },
  { timestamps: true },
);

const transactionModel = model<Transaction & Document>('Transaction', transactionSchema);

export default transactionModel;
