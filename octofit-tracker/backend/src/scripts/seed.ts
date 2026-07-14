import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Workout from '../models/Workout';
import LeaderboardEntry from '../models/LeaderboardEntry';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
    ]);

    // Create users
    const users = await User.create([
      { name: 'Alice Morgan', email: 'alice@example.com', totalPoints: 1200 },
      { name: 'Bob Chen', email: 'bob@example.com', totalPoints: 900 },
      { name: 'Carol Singh', email: 'carol@example.com', totalPoints: 1500 },
      { name: 'Diego Ramirez', email: 'diego@example.com', totalPoints: 700 },
    ]);

    // Create teams
    const redTeam = await Team.create({ name: 'Red Rockets', members: [users[0]._id, users[1]._id] });
    const blueTeam = await Team.create({ name: 'Blue Whales', members: [users[2]._id, users[3]._id] });

    // Create activities
    const activities = [
      { user: users[0]._id, type: 'run', distanceKm: 5.2, durationMin: 30, calories: 320 },
      { user: users[0]._id, type: 'bike', distanceKm: 20, durationMin: 60, calories: 600 },
      { user: users[1]._id, type: 'swim', distanceKm: 1.2, durationMin: 40, calories: 350 },
      { user: users[2]._id, type: 'run', distanceKm: 10, durationMin: 55, calories: 650 },
      { user: users[3]._id, type: 'bike', distanceKm: 12.5, durationMin: 45, calories: 480 },
    ];
    await Activity.create(activities);

    // Create workouts
    const workouts = await Workout.create([
      {
        title: 'Beginner Run Builder',
        description: 'A gentle progression run for building endurance',
        durationMin: 30,
        difficulty: 'easy',
        exercises: ['5 min warm-up', '20 min easy run', '5 min cool-down'],
      },
      {
        title: 'HIIT Core Blast',
        description: 'High-intensity intervals focusing on core strength',
        durationMin: 20,
        difficulty: 'hard',
        exercises: ['Plank', 'Russian twists', 'Bicycle crunches'],
      },
    ]);

    // Create leaderboard entries
    const leaderboardEntries = [
      { user: users[2]._id, points: 1500 },
      { user: users[0]._id, points: 1200 },
      { user: users[1]._id, points: 900 },
      { user: users[3]._id, points: 700 },
    ];
    await LeaderboardEntry.create(leaderboardEntries);

    console.log('Inserted:', {
      users: users.length,
      teams: 2,
      activities: activities.length,
      workouts: workouts.length,
      leaderboard: leaderboardEntries.length,
    });

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
