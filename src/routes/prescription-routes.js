const express = require('express');
const router = express.Router();
const controller = require('../controllers/prescription-controller');
const auth = require('../middlewares/auth');

router.get('/',auth, controller.get);
router.get('/:id',auth, controller.getById);
router.post('/',auth, controller.post);
router.put('/',auth, controller.put);
router.delete('/:id',auth, controller.delete);


module.exports = router;