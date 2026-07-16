import { Schema, model, type InferSchemaType } from 'mongoose';

const workoutExerciseSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    sets: { type: Number, min: 1 },
    reps: { type: Number, min: 1 },
    durationMinutes: { type: Number, min: 1 },
  },
  { _id: false }
);

const workoutSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, enum: ['strength', 'endurance', 'mobility', 'recovery'], required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    estimatedMinutes: { type: Number, required: true, min: 1 },
    exercises: [workoutExerciseSchema],
    scheduledFor: { type: Date },
  },
  { timestamps: true }
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;
const Workout = model('Workout', workoutSchema);

export default Workout;
