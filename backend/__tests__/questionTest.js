const mongoose = require("mongoose")
const request = require("supertest")

const app = require("../server")

require("dotenv").config()

let questionID

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI)

  const response = await request(app)
    .post("/api/questions")
    .send({
      questionAsked: "question",
      options: "5,6,7",
      answers: "6,7",
      questionType: "MCQ"
    })
    .expect(200)
  questionID = response.body._id
})

afterAll(async () => {
    await mongoose.connection.close()
}) 

describe("POST /api/questions", () => {
    it("should add a question to the database", async () => {
      const response = await request(app)
        .post(`/api/questions`)
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

  describe("GET /api/questions", () => {
    it("should get all the questions in the database", async () => {
      const response = await request(app)
        .get(`/api/questions`)
      expect(response.statusCode).toBe(200)
    })
  })
  
  describe("GET /api/questions/:id", () => {
    it("should get the sample question from the database", async () => {
      const response = await request(app)
        .get(`/api/questions/${questionID}`)
      expect(response.statusCode).toBe(200)
    })
  })

  describe("PATCH /api/questions/:id", () => {

    it("it should update the sample question multiple times", async () => {

      const responseOne = await request(app)
        .patch(`/api/questions/${questionID}`)
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
        .patch(`/api/questions/${questionID}`)
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

  describe("DELETE /api/questions/:id", () => {

    it("should delete the sample question from database", async () => {

      const response = await request(app)
        .delete(`/api/questions/${questionID}`)
        expect(response.statusCode).toBe(200)
    }) 
  }) 
  

  