//import all required components
const express = require("express")
const Controller = require('../controllers/questionController')
const router = express.Router()

//defines all api request urls to access controllers 
router.get("/:classID/", Controller.getAllQuestions)
router.get("/:classID/:id", Controller.getQuestion)
router.post("/:classID/", Controller.createQuestion)
router.delete("/:classID/:id", Controller.deleteQuestion)
router.patch("/:classID/:id", Controller.updateQuestion)

//Export questions router module
module.exports = router