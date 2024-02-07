const express = require("express")

// const Controller = require('../controllers/questionController')

const router = express.Router()

router.get("/", Controller.getAllQuestion)

router.get("/:id", Controller.getQuestion)

router.post("/", Controller.createQuestion)

router.delete("/:id", Controller.deleteQuestion)

router.patch("/:id", Controller.updateQuestion)

module.exports = router

