import { Schema, model, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    motto: { type: String, trim: true },
    weeklyDistanceGoalKm: { type: Number, min: 0, default: 0 },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;
const Team = model('Team', teamSchema);

export default Team;
