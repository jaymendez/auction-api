import { User } from '@interfaces/users.interface';
import { Document, model, Schema } from 'mongoose';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  moneyAmount: {
    type: Number,
    default: 0,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
