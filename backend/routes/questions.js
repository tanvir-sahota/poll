const express = require("express")

const Controller = require('../controllers/questionController')

const router = express.Router()

router.get("/:classID/", Controller.getAllQuestions)

router.get("/:classID/:id", Controller.getQuestion)

router.post("/:classID/", Controller.createQuestion)

router.delete("/:classID/:id", Controller.deleteQuestion)

router.patch("/:classID/:id", Controller.updateQuestion)

module.exports = router

