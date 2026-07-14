import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  createdAt: Date;
  teams: mongoose.Types.ObjectId[];
  totalPoints?: number;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: () => new Date() },
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  totalPoints: { type: Number, default: 0 },
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
