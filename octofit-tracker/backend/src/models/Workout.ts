import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description?: string;
  durationMin?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  exercises?: string[];
  createdAt: Date;
}

const WorkoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String },
  durationMin: { type: Number },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  exercises: [{ type: String }],
  createdAt: { type: Date, default: () => new Date() },
});

const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
export default Workout;
