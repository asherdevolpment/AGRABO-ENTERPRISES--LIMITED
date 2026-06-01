const multer = require('multer');
const router = require('express').Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/product.controller');

const upload = multer({ dest: 'uploads/' });

router.get('/', controller.listProducts);
router.get('/:id', controller.getProduct);
router.post('/', auth, upload.single('image'), controller.createProduct);
router.put('/:id', auth, upload.single('image'), controller.updateProduct);
router.delete('/:id', auth, controller.deleteProduct);

module.exports = router;
