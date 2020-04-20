const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const auth = require('../middlewares/auth');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router

const customerSearchRouter = express.Router({mergeParams: true});

router.get('/',auth, controller.get);
router.get('/:id',auth, controller.getById);
router.post('/',auth, controller.post);
router.put('/',auth, controller.put);
router.delete('/:id',auth, controller.delete);
customerSearchRouter.get('/', controller.getByName);


router.use('/customers/search', customerSearchRouter);

module.exports = router;