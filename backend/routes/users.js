const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController')

router.use(express.json());

router.post('/', createUser);

module.exports = router;