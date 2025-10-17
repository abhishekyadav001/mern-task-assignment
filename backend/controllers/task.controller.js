const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User');

exports.createTask = async (req, res) => {
  const { projectId } = req.params;
  const { title, status, assignedTo, dueDate } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });
  const project = await Project.findOne({ _id: projectId, owner: req.userId });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  
  // Validate assignedTo email if provided
  let assignedToName = null;
  if (assignedTo && assignedTo.trim()) {
    const user = await User.findOne({ email: assignedTo.trim() });
    if (!user) return res.status(400).json({ message: 'User with this email not found' });
    assignedToName = user.name;
  }
  
  const task = await Task.create({ 
    project: projectId, 
    title, 
    status, 
    assignedTo: assignedTo?.trim() || null,
    assignedToName,
    dueDate 
  });
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  const tasks = await Task.find({ project: projectId }).sort({ createdAt: -1 });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const { projectId, taskId } = req.params;
  const project = await Project.findOne({ _id: projectId, owner: req.userId });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  const task = await Task.findOneAndUpdate(
    { _id: taskId, project: projectId },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const { projectId, taskId } = req.params;
  const project = await Project.findOne({ _id: projectId, owner: req.userId });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  const task = await Task.findOneAndDelete({ _id: taskId, project: projectId });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
};


