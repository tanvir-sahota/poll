const express = require("express")

const Controller = require('../controllers/questionResultsController')

const router = express.Router()

router.get("/:quizResultID", Controller.getQuestionResults)

router.get("/:quizResultID/:id", Controller.getQuestionResult)

router.post("/", Controller.createQuestionResults)

router.delete("/:classID/:id", Controller.deleteQuestionResults)

module.exports = router

