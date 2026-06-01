const router = require('express').Router();
const auth = require('../middleware/auth');
const { summary } = require('../controllers/dashboard.controller');

router.get('/summary', auth, summary);

module.exports = router;
