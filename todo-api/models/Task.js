import mongoose from 'mongoose';


const TaskShema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 30,
    },
    description: {
      type: String,
      required: true,
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