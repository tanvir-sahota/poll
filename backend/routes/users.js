const express = require('express');
const router = express.Router();
const { getUsers, createUser, loginUser } = require('../controllers/userController')

router.use(express.json());

router.get('/:token', getUserByToken)
router.get('/', getUsers)
router.post('/signup', createUser)
router.post('/login', loginUser)

module.exports = router;