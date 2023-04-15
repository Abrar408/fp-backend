const express = require('express');
const router = express.Router();
const job = require('../controllers/jobController')

router.post('/create',job.create)
router.post('/get',job.get)

module.exports = router; 