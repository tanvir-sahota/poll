const mongoose = require("mongoose")
const request = require("supertest")

const app = require("../server")

require("dotenv").config()

beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI)
})

afterEach(async () => {
    await mongoose.connection.close()
}) 

describe("POST /api/questions", () => {
    it("should add a question to the database", async () => {
     /* const token = await request(app).post("/api/auth/login").send({
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      }); */
    
  
      const response = await request(app)
        .post("/api/questions")
        .send({
          question: "What is 3 * 12",
          options: "5 45 56 36 18",
          answers: "36"
        })
        .set({
          //Authorization: "bearer " + token.body.token,
          "Content-Type": "application/json"
        })
  
      expect(response.statusCode).toBe(200)
    })
  })
