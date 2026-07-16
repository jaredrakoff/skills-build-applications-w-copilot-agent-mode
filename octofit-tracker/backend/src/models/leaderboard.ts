import { Schema, model, type InferSchemaType } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    period: { type: String, enum: ['weekly', 'monthly', 'all-time'], required: true },
    rank: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    lastUpdatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;
const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;
