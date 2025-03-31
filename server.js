import express from 'express';
import workout from './controllers/workoutController.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const router = express.Router();
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/workoutDB';
if (mongoose.connection.readyState === 0) {
  mongoose
    .connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

// ✅ Add a new route to get all workouts
router.get('/workouts', async (req, res) => {
  try {
    const workouts = await workout.getAllWorkouts(); // Ensure this function exists
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workouts', error: error.message });
  }
});

// Create a workout
router.post('/workouts/:id/exercises', async (req, res) => {
  try {
    const { id } = req.params;
    const { exercise } = req.body;

    if (!exercise || !exercise.name || !exercise.sets || !exercise.reps) {
      return res.status(400).json({ message: 'Invalid exercise data' });
    }

    const updatedWorkout = await workout.addExercise(id, exercise);
    res.status(201).json({ message: 'Exercise added', workout: updatedWorkout });
  } catch (error) {
    res.status(400).json({ message: 'Error adding exercise', error: error.message });
  }
});

// Remove an exercise from a workout
router.delete('/workouts/:id/exercises/:exercise', async (req, res) => {
  try {
    const { id, exercise } = req.params;
    const updatedWorkout = await workout.removeExercise(id, exercise);
    res.status(200).json({ message: 'Exercise removed successfully', workout: updatedWorkout });
  } catch (error) {
    res.status(400).json({ message: 'Error removing exercise', error: error.message });
  }
});

// Get all exercises for a workout
router.get('/workouts/:workoutId/exercises', async (req, res) => {
  try {
    const { workoutId } = req.params;
    const exercises = await workout.getExercises(workoutId);
    res.status(200).json({ exercises });
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving exercises', error: error.message });
  }
});

// Use the router with the /api prefix
app.use('/api', router);

// Start the server only if not in a test environment
if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3003;
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  // Gracefully handle server shutdown
  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Server closed due to SIGTERM');
      mongoose.connection.close(false, () => {
        console.log('MongoDB connection closed');
        process.exit(0);
      });
    });
  });
}

export default app;
