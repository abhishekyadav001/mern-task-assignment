const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    title: { type: String, required: true, trim: true },
    status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo', index: true },
    assignedTo: { type: String, default: null }, // Store email instead of ObjectId
    assignedToName: { type: String, default: null }, // Store user name for display
    dueDate: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);


