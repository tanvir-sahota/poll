const mongoose = require("mongoose")
const request = require("supertest")

const app = require("../server")

require('dotenv').config()


beforeEach(async () => {
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



describe("GET /api/quizzes", () => {
    it("should get all quizzes", async () => {        
        const response = await request(app).get("/api/quizzes/")
            .set({
                "Content-Type": "application/json"
            })
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBeGreaterThan(0)
    })
})

describe("POST /api/quizzes", () => {
    it("should post a quiz", async () => {
        const quizzes_before_post = await request(app).get("/api/quizzes/")
            .set({
                "Content-Type": "application/json"
            })

        const response = await request(app).post("/api/quizzes")
            .send({
                title: "example",
            })
            .set({
                "Content-Type": "application/json"
            })
        
        const quizzes_after_post = await request(app).get("/api/quizzes/")
            .set({
                "Content-Type": "application/json"
            })


        const quiz_added = (quizzes_after_post.body.length==quizzes_before_post.body.length+1)
        expect(quiz_added).toBe(true)
    })
})

describe("GET /api/quizzes/:id", () => {
    it("should get one quiz", async () => {
        const ensure_at_least_one_quiz = await request(app).post("/api/quizzes")
            .send({
                title: "exa"
            })
            .set({
                "Content-Type": "application/json"
            })
        expect(ensure_at_least_one_quiz.statusCode).toBe(201)
        
        const all_quizzes = await request(app).get("/api/quizzes/")
        .set({
            "Content-Type": "application/json"
        })
        expect(all_quizzes.statusCode).toBe(200)


        const id = all_quizzes.body[0]._id
        const get_one_quiz = await request(app).get("/api/quizzes/"+id)
            .set({
                "Content-Type": "application/json"
            })
        expect(get_one_quiz.statusCode).toBe(200)
        expect(get_one_quiz.body._id).toBe(id)
    })
})

describe("DELETE /api/quizzes/:id", () => {
    it("should delete one quiz", async () => {    
        const ensure_at_least_one_quiz = await request(app).post("/api/quizzes")
            .send({
                title: "exa"
            })
            .set({
                "Content-Type": "application/json"
            })
        expect(ensure_at_least_one_quiz.statusCode).toBe(201)
        
        const id = ensure_at_least_one_quiz.body._id
        const delete_this_quiz = await request(app).delete("/api/quizzes/"+id)
            .set({
                "Content-Type": "application/json"
            })
        expect(delete_this_quiz.statusCode).toBe(200)
    })
})

describe("PATCH /api/quizzes/:id", () => {
    it("should patch one quiz", async () => {    
        const ensure_at_least_one_quiz = await request(app).post("/api/quizzes")
            .send({
                title: "exa"
            })
            .set({
                "Content-Type": "application/json"
            })
        expect(ensure_at_least_one_quiz.statusCode).toBe(201)
        
        const id = ensure_at_least_one_quiz.body._id
        const patch_this_quiz = await request(app).patch("/api/quizzes/"+id)
            .send({
                title: "not_exa"
            })
            .set({
                "Content-Type": "application/json"
            })
        expect(patch_this_quiz.statusCode).toBe(200)

        const get_one_quiz = await request(app).get("/api/quizzes/"+id)
            .set({
                "Content-Type": "application/json"
            })
        expect(get_one_quiz.statusCode).toBe(200)
        expect(get_one_quiz.body.title).toBe("not_exa")
    })
})
