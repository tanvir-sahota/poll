//import all required components
const express = require("express")
const Controller = require('../controllers/questionResultsController')
const router = express.Router()

//defines all api request urls to access controllers 
router.get("/:quizResultID", Controller.getQuestionResults)
router.get("/:quizResultID/:id", Controller.getQuestionResult)
router.post("/", Controller.createQuestionResults)
router.delete("/:classID/:id", Controller.deleteQuestionResults)

//Export question results router module
module.exports = router