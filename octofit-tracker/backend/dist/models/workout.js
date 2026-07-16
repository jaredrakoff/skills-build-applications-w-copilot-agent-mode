"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutExerciseSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    sets: { type: Number, min: 1 },
    reps: { type: Number, min: 1 },
    durationMinutes: { type: Number, min: 1 },
}, { _id: false });
const workoutSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, enum: ['strength', 'endurance', 'mobility', 'recovery'], required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    estimatedMinutes: { type: Number, required: true, min: 1 },
    exercises: [workoutExerciseSchema],
    scheduledFor: { type: Date },
}, { timestamps: true });
const Workout = (0, mongoose_1.model)('Workout', workoutSchema);
exports.default = Workout;
