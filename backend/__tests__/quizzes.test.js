const mongoose = require("mongoose")
const request = require("supertest")

const app = require("../server")

require('dotenv').config()


beforeEach(async () => {
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nheen")
    await mongoose.connect(process.env.MONGO_URI).then(() => {console.log('Successfully connected to database.')})
})
afterEach(async () => {
    await mongoose.connection.close().then(() => {{console.log('End of test.')}})
})




// TODO:
//      ensure each route uses correct function
//      ensure correct results are returned
// 
//      constrasts with controllers where we check the innards of the route functions




// describe("GET /api/quizzes", () => {
//     it("should get all quizzes", async () => {
        
//         // const response = await request(app).get("/api/quizzes/")



//     })
// })
