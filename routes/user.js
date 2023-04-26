const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');

router.post('/updateBalance',user.updateBalance);

module.exports = router;