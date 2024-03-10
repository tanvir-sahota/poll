const express = require('express');
const router = express.Router();
const { getUserByToken, getUsers, createUser, loginUser, getUserById } = require('../controllers/userController')

router.use(express.json());

router.get('/:token', getUserByToken)
router.get('/:id', getUserById)
router.get('/', getUsers)
router.post('/signup', createUser)
router.post('/login', loginUser)

module.exports = router;