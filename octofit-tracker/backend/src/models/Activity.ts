import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  distanceKm: number;
  durationMin: number;
  calories?: number;
  date: Date;
}

const ActivitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  distanceKm: { type: Number, required: true },
  durationMin: { type: Number, required: true },
  calories: { type: Number },
  date: { type: Date, default: () => new Date() },
});

const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);
export default Activity;
