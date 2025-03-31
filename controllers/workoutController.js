import WorkoutModel from '../models/workout.js'; // Import the workout model

class WorkoutController {
  // ✅ Get all workouts
  async getAllWorkouts() {
    try {
      const workouts = await WorkoutModel.find(); // Use Mongoose `find()` to get all workouts
      return workouts;
    } catch (error) {
      throw new Error('Error retrieving workouts: ' + error.message);
    }
  }

  // ✅ Get a single workout by ID
  async getWorkoutById(workoutId) {
    try {
      const workout = await WorkoutModel.findById(workoutId);
      if (!workout) {
        throw new Error('Workout not found');
      }
      return workout;
    } catch (error) {
      throw new Error('Error retrieving workout: ' + error.message);
    }
  }

  // ✅ Create a workout
  async createWorkout(username) {
    try {
      const newWorkout = new WorkoutModel({ username, exercises: [] }); // Create a new workout document
      await newWorkout.save();
      return newWorkout;
    } catch (error) {
      throw new Error('Error creating workout: ' + error.message);
    }
  }

  // ✅ Add an exercise to a workout
  async addExercise(workoutId, exercise) {
    try {
      const workout = await WorkoutModel.findById(workoutId);
      if (!workout) {
        throw new Error('Workout not found');
      }

      workout.exercises.push(exercise); // Add new exercise to the array
      await workout.save();
      return workout;
    } catch (error) {
      throw new Error('Error adding exercise: ' + error.message);
    }
  }

  // ✅ Remove an exercise from a workout
  async removeExercise(workoutId, exerciseName) {
    try {
      const workout = await WorkoutModel.findById(workoutId);
      if (!workout) {
        throw new Error('Workout not found');
      }

      // Filter out the exercise by name
      workout.exercises = workout.exercises.filter(ex => ex.name !== exerciseName);
      await workout.save();
      return workout;
    } catch (error) {
      throw new Error('Error removing exercise: ' + error.message);
    }
  }

  // ✅ Get all exercises for a specific workout
  async getExercises(workoutId) {
    try {
      const workout = await WorkoutModel.findById(workoutId);
      if (!workout) {
        throw new Error('Workout not found');
      }

      return workout.exercises;
    } catch (error) {
      throw new Error('Error retrieving exercises: ' + error.message);
    }
  }

  // ✅ Delete a workout
  async deleteWorkout(workoutId) {
    try {
      const deletedWorkout = await WorkoutModel.findByIdAndDelete(workoutId);
      if (!deletedWorkout) {
        throw new Error('Workout not found');
      }
      return { message: 'Workout deleted successfully', deletedWorkout };
    } catch (error) {
      throw new Error('Error deleting workout: ' + error.message);
    }
  }
}

export default new WorkoutController(); // Export an instance of the controller
