const router = require('express').Router({ mergeParams: true });
const auth = require('../middlewares/auth.middleware');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/task.controller');

router.use(auth);

// Mounted at /api/projects/:projectId/tasks with mergeParams
router.post('/', createTask);
router.get('/', getTasks);
router.patch('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

module.exports = router;


