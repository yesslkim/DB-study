import mongoose from 'mongoose';


const TaskShema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    isComplete: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', TaskShema);

export default Task;