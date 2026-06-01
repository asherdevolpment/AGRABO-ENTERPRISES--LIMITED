const router = require('express').Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/bulk-request.controller');

router.post('/', controller.createBulkRequest);
router.get('/', auth, controller.listBulkRequests);

module.exports = router;
