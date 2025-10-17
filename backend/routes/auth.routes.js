const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const { register, login, searchUsers } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.get('/users/search', auth, searchUsers);

module.exports = router;


