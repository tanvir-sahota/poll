//import all required components
const express = require('express');
const router = express.Router();
const { getUserByToken, getUsers, createUser, loginUser, getUserById, getUserByUsername } = require('../controllers/userController')

router.use(express.json());

//defines all api request urls to access controllers 
router.get('/token/:token', getUserByToken)
router.get('/id/:id', getUserById)
router.get('/:username', getUserByUsername)
router.get('/', getUsers)
router.post('/signup', createUser)
router.post('/login', loginUser)

//Export questions router module
module.exports = router;