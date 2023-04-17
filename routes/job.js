const express = require('express');
const router = express.Router();
const job = require('../controllers/jobController')

router.post('/create',job.create)
router.post('/get',job.get)
router.post('/getAdmin',job.getAdmin)
router.post('/submit',job.submit)
router.post('/accept',job.accept)
router.post('/reject',job.reject)

module.exports = router; 