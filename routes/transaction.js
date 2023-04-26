const express = require('express');
const router = express.Router();
const transaction = require('../controllers/transactionController');

router.post('/create',transaction.create);
router.post('/get',transaction.get);

module.exports = router;