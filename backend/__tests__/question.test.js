const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../app")
const server = require("../server")
const { findByIdAndDelete } = require("../models/questionModel")
const User = require("../models/userModel")
require("dotenv").config()

let questionID
let classID
let userID

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI)

  //create sample user
  const userResponse = await request(app)
    .post("/api/users/signup")
    .send({
      username: "testUser",
      password: "testPassword"
    })
    .set({
      "Content-Type": "application/json"
    })

    userID = userResponse.body._id

  //create sample class
  const classResponse = await request(app)
    .post("/api/classrooms")
    .send({
      owner : JSON.stringify({token: userResponse.body.token}),
      title : "title",
      questions: []
    })
    .set({
      "Content-Type": "application/json"
    })

    classID = classResponse.body._id
  //create sample question
  const questionResponse = await request(app)
    .post(`/api/questions/${classID}`)
    .send({
      questionAsked: "question",
      options: "5,6,7",
      answers: "6,7"
    })
    .set({
      "Content-Type": "application/json"
    })
  questionID = questionResponse.body._id
})

afterAll(async () => {
  await User.deleteOne({ username: "testUser" })
    await mongoose.connection.close()
    server.close()
}) 

describe("POST /api/questions/:classID", () => {
    it("should add a question to the database", async () => {
      const response = await request(app)
        .post(`/api/questions/${classID}`)
        .send({
          questionAsked: "What is 3 + 12",
          options: "5,45,56,36,18",
          answers: "5,45",
          questionType: "MCQ"
        })
        .set({
          "Content-Type": "application/json"
        })
      expect(response.statusCode).toBe(200)

      await request(app).delete(`/api/questions/${response.body._id}`)
    })
  })

  describe("GET /api/questions/:classID", () => {
    it("should get all the questions in the database", async () => {
      const response = await request(app)
        .get(`/api/questions/${classID}`)
      expect(response.statusCode).toBe(200)
    })
  })
  
  describe("GET /api/questions/:classID/:questionID", () => {
    it("should get the sample question from the database", async () => {
      const response = await request(app)
        .get(`/api/questions/${classID}/${questionID}`)
      expect(response.statusCode).toBe(200)
    })
  })

  describe("PATCH /api/questions/:classID/:questionID", () => {

    it("it should update the sample question multiple times", async () => {

      const responseOne = await request(app)
        .patch(`/api/questions/${classID}/${questionID}`)
        .send({
          questionAsked: "new question",
          options: "9,3,a",
          answers: "3,a"
        })
        .set({
          "Content-Type": "application/json"
        })
      expect(responseOne.statusCode).toBe(200)
        
      const responseTwo = await request(app)
        .patch(`/api/questions/${classID}/${questionID}`)
        .send({
          options: "3,a,6,7,f",
          answers: "6,7"
        })
        .set({
          "Content-Type": "application/json"
        })
      expect(responseTwo.statusCode).toBe(200)
    }) 
  }) 

  describe("DELETE /api/questions/:classID/:questionID", () => {

    it("should delete the sample question from database", async () => {

      const response = await request(app)
        .delete(`/api/questions/${classID}/${questionID}`)
        expect(response.statusCode).toBe(200)
    }) 
  }) 

  describe("POST /api/questions/:classID", () => {
    it("should return a 422 error as the options doesnt contain all answers", async () => {
      const response = await request(app)
        .post(`/api/questions/${classID}`)
        //4 in answers is not one of the options
        .send({
          questionAsked: "What is 3 + 12",
          options: "5,45,56,36,18",
          answers: "5,4",
          questionType: "MCQ"
        })
        .set({
          "Content-Type": "application/json"
        })
      expect(response.statusCode).toBe(422)
    })
  })
  
  describe("GET /api/questions/:classID/:questionID", () => {
    it("should return 404 error as question doesn't exist", async () => {
      const response = await request(app)
      //object doesnt exist in database
        .get(`/api/questions/${classID}/invalidID`)
      expect(response.statusCode).toBe(404)
    })
  })

  describe("POST /api/questions/:classID", () => {
    it("should return a 400 error as all fields not filled", async () => {
      const response = await request(app)
        .post(`/api/questions/${classID}`)
        //answers field unfilled
        .send({
          questionAsked: "What is 3 + 12",
          options: "5,45,56,36,18",
          questionType: "MCQ"
        })
        .set({
          "Content-Type": "application/json"
        })
      expect(response.statusCode).toBe(400)
    })
  })

  