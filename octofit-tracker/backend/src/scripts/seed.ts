import mongoose from 'mongoose';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Team from '../models/team';
import User from '../models/user';
import Workout from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Avery Khan',
        email: 'avery.khan@octofit.local',
        age: 29,
        city: 'Seattle',
        fitnessLevel: 'advanced',
        goals: ['Sub-45 10K', 'Improve VO2 max'],
      },
      {
        name: 'Mia Thompson',
        email: 'mia.thompson@octofit.local',
        age: 34,
        city: 'Austin',
        fitnessLevel: 'intermediate',
        goals: ['Consistency streak', 'Half marathon prep'],
      },
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@octofit.local',
        age: 26,
        city: 'Denver',
        fitnessLevel: 'beginner',
        goals: ['Build strength', 'Daily mobility'],
      },
      {
        name: 'Priya Nair',
        email: 'priya.nair@octofit.local',
        age: 31,
        city: 'Chicago',
        fitnessLevel: 'advanced',
        goals: ['Top team leaderboard rank', 'Triathlon conditioning'],
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Summit Striders',
        city: 'Seattle',
        motto: 'Climb every mile.',
        weeklyDistanceGoalKm: 120,
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Pulse Pack',
        city: 'Chicago',
        motto: 'Heart rate up, excuses down.',
        weeklyDistanceGoalKm: 95,
        members: [users[2]._id, users[3]._id],
      },
    ]);

    await Promise.all([
      User.updateOne({ _id: users[0]._id }, { team: teams[0]._id }),
      User.updateOne({ _id: users[1]._id }, { team: teams[0]._id }),
      User.updateOne({ _id: users[2]._id }, { team: teams[1]._id }),
      User.updateOne({ _id: users[3]._id }, { team: teams[1]._id }),
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'run',
        durationMinutes: 52,
        distanceKm: 10.2,
        caloriesBurned: 710,
        performedAt: new Date('2026-07-14T06:45:00Z'),
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        type: 'cycle',
        durationMinutes: 68,
        distanceKm: 24.6,
        caloriesBurned: 690,
        performedAt: new Date('2026-07-14T18:10:00Z'),
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        type: 'strength',
        durationMinutes: 44,
        distanceKm: 0,
        caloriesBurned: 360,
        performedAt: new Date('2026-07-15T07:20:00Z'),
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        type: 'swim',
        durationMinutes: 49,
        distanceKm: 2.1,
        caloriesBurned: 540,
        performedAt: new Date('2026-07-15T16:35:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        period: 'weekly',
        rank: 1,
        points: 980,
        user: users[3]._id,
        team: teams[1]._id,
      },
      {
        period: 'weekly',
        rank: 2,
        points: 940,
        user: users[0]._id,
        team: teams[0]._id,
      },
      {
        period: 'weekly',
        rank: 3,
        points: 810,
        user: users[1]._id,
        team: teams[0]._id,
      },
      {
        period: 'weekly',
        rank: 4,
        points: 690,
        user: users[2]._id,
        team: teams[1]._id,
      },
    ]);

    await Workout.insertMany([
      {
        user: users[0]._id,
        title: 'Tempo Run Builder',
        category: 'endurance',
        difficulty: 'advanced',
        estimatedMinutes: 60,
        scheduledFor: new Date('2026-07-17T06:30:00Z'),
        exercises: [
          { name: 'Easy jog warmup', durationMinutes: 10 },
          { name: 'Tempo interval', sets: 3, durationMinutes: 8 },
          { name: 'Cool down', durationMinutes: 10 },
        ],
      },
      {
        user: users[1]._id,
        title: 'Cycling Endurance Mix',
        category: 'endurance',
        difficulty: 'intermediate',
        estimatedMinutes: 50,
        scheduledFor: new Date('2026-07-17T18:00:00Z'),
        exercises: [
          { name: 'Cadence spin-up', durationMinutes: 8 },
          { name: 'Zone 3 hold', sets: 4, durationMinutes: 6 },
          { name: 'Recovery spin', durationMinutes: 6 },
        ],
      },
      {
        user: users[2]._id,
        title: 'Foundational Strength',
        category: 'strength',
        difficulty: 'beginner',
        estimatedMinutes: 40,
        scheduledFor: new Date('2026-07-18T07:00:00Z'),
        exercises: [
          { name: 'Goblet squats', sets: 3, reps: 10 },
          { name: 'Push-ups', sets: 3, reps: 8 },
          { name: 'Plank', sets: 3, durationMinutes: 1 },
        ],
      },
      {
        user: users[3]._id,
        title: 'Swim + Mobility Recovery',
        category: 'recovery',
        difficulty: 'advanced',
        estimatedMinutes: 45,
        scheduledFor: new Date('2026-07-18T17:45:00Z'),
        exercises: [
          { name: 'Easy laps', durationMinutes: 20 },
          { name: 'Band shoulder mobility', sets: 3, reps: 12 },
          { name: 'Hip opener flow', durationMinutes: 10 },
        ],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
