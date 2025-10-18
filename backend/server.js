const express = require('express');
const mongoose = require('mongoose');
const { connectDB } = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projects/:projectId/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();


