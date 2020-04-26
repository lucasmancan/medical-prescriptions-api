const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');
const auth = require('../middlewares/auth');

router.get('/', controller.populate);
router.get('/:id',auth, controller.getById);

router.post('/', controller.post);
router.put('/',auth, controller.put);
router.delete('/:id',auth, controller.delete);

module.exports = router;