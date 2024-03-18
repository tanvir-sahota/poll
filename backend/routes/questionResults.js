const express = require("express")

const Controller = require('../controllers/questionResultsController')

const router = express.Router()

router.get("/:classID/:id", Controller.getQuestionResults)

router.post("/", Controller.createQuestionResults)

router.delete("/:classID/:id", Controller.deleteQuestionResults)

module.exports = router

