const express = require('express');
const router = express.Router();
const bill = require('../controllers/billController')

router.post('/add',bill.add)
router.post('/get',bill.get)
router.post('/update',bill.update)

module.exports = router; 