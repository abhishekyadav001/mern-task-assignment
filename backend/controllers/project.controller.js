const Project = require('../models/Project');
const Task = require('../models/Task');

exports.createProject = async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });
  const project = await Project.create({ title, description: description || '', owner: req.userId });
  res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
  const page = Math.max(parseInt(req.query.page || '1', 10), 1)
  const limit = Math.min(Math.max(parseInt(req.query.limit || '10', 10), 1), 50)
  const skip = (page - 1) * limit

  const [items, total] = await Promise.all([
    Project.find()
      .populate('owner', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Project.countDocuments(),
  ])

  const pages = Math.max(Math.ceil(total / limit), 1)
  res.json({ items, total, page, limit, pages })
};

exports.getProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id).populate('owner', 'name email');
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findOneAndDelete({ _id: id, owner: req.userId });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  await Task.deleteMany({ project: project._id });
  res.json({ message: 'Project deleted' });
};


