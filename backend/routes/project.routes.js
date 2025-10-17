const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const { createProject, getProjects, getProject, deleteProject } = require('../controllers/project.controller');

router.use(auth);

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProject);
router.delete('/:id', deleteProject);

module.exports = router;


