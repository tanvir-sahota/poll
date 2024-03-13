const express = require('express');
const router = express.Router();
const { getUserByToken, getUsers, createUser, loginUser, getUserById, getUserByUsername } = require('../controllers/userController')

router.use(express.json());

router.get('/token/:token', getUserByToken)
router.get('/id/:id', getUserById)
router.get('/:username', getUserByUsername)
router.get('/', getUsers)
router.post('/signup', createUser)
router.post('/login', loginUser)

module.exports = router;