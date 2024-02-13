const mongoose = require("mongoose")
const request = require("supertest")

const app = require("../server")
const questionModel = require("../models/questionModel")

require("dotenv").config()

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI)
})

afterAll(async () => {
    await mongoose.connection.close()
}) 

describe("POST /api/questions", () => {
    it("should add a question to the database", async () => {
      const response = await request(app)
        .post("/api/questions")
        .send({
          questionAsked: "What is 3 + 12",
          options: "5 45 56 36 18",
          answers: "36"
        })
        .set({
          "Content-Type": "application/json"
        })
      expect(response.statusCode).toBe(200)
    })
  })

  describe("GET /api/questions", () => {
    it("should get all the questions in the database", async () => {
      const response = await request(app)
        .get("/api/questions")
        .set({
          "Content-Type": "application/json"
        })
      expect(response.statusCode).toBe(200)
    })
  })

  
  describe("DELETE /api/questions/:id", () => {
      let questionID
    

    it("should add a question then delete the same question from database", async () => {
    
      const response = await request(app)
      .post("/api/questions")
        .send({
          questionAsked: "What is 3 + 12",
          options: "5 45 56 36 18",
          answers: "36"
        })
        .set({
          "Content-Type": "application/json"
        })
      expect(response.statusCode).toBe(200)
      
      questionID = response.body._id

    
      const deleteResponse = await request(app)
        .delete("/api/questions/${questionID}")
        .expect(deleteResponse.statusCode) 
    }) 
  }) 