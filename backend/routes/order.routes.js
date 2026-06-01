const router = require('express').Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/order.controller');

router.post('/', controller.createOrder);
router.get('/', auth, controller.listOrders);
router.get('/:id', auth, controller.getOrder);
router.put('/:id/status', auth, controller.updateOrderStatus);

module.exports = router;
