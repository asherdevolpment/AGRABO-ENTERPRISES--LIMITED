const router = require('express').Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/contact.controller');

router.post('/', controller.createContactMessage);
router.get('/', auth, controller.listContactMessages);

module.exports = router;
