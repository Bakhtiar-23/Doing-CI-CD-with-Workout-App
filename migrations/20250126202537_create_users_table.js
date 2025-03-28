import mongoose from 'mongoose';

// Define schema for workouts
const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// Define schema for workouts_exercises
const workoutExerciseSchema = new mongoose.Schema({
  workout_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true },
  exercise: { type: String, required: true },
});

// Create models
const Workout = mongoose.model('Workout', workoutSchema);
const WorkoutExercise = mongoose.model('WorkoutExercise', workoutExerciseSchema);

// Migration up function
export const up = async function () {
  try {
    // Create collections (MongoDB handles collections automatically when a model is defined)
    await Workout.createIndexes();
    await WorkoutExercise.createIndexes();
    console.log('Migration up: Tables created');
  } catch (error) {
    console.error('Error running migration up:', error);
  }
};

// Migration down function
export const down = async function () {
  try {
    // Drop collections
    await Workout.collection.drop();
    await WorkoutExercise.collection.drop();
    console.log('Migration down: Tables dropped');
  } catch (error) {
    console.error('Error running migration down:', error);
  }
};
