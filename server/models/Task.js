import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, 
  category: {
    type: String,
    enum: ['work', 'personal', 'study', 'other'],
    default: 'other',
    required: true
  }
}, {
  timestamps: true
});
export default mongoose.model('Task', taskSchema);
