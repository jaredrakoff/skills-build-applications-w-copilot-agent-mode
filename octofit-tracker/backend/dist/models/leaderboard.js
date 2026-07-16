"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    period: { type: String, enum: ['weekly', 'monthly', 'all-time'], required: true },
    rank: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
    lastUpdatedAt: { type: Date, default: Date.now },
}, { timestamps: true });
const Leaderboard = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
exports.default = Leaderboard;
