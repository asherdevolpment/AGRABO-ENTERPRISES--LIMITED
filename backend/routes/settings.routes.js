const router = require('express').Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/settings.controller');

router.get('/', controller.getSettings);
router.put('/', auth, controller.updateSettings);

module.exports = router;
