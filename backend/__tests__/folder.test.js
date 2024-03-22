const mongoose = require("mongoose")
const request = require("supertest")

const app = require("../app")

require('dotenv').config()


beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Successfully connected to database.')
    })
})
afterEach(async () => {
    await mongoose.connection.close().then(() => {
        {
            console.log('End of test.')
        }
    })
})



describe("GET /api/folders", () => {
    it("should get all folders", async () => {
        const ensure_at_least_one_folder = await request(app).post("/api/folders")
            .send({
                title: "exa"
            })
            .set({
                "Content-Type": "application/json"
            })
        expect(ensure_at_least_one_folder.statusCode).toBe(201)
        
        const ensure_at_least_two_folders = await request(app).post("/api/folders")
            .send({
                title: "exa2"
            })
            .set({
                "Content-Type": "application/json"
            })
        expect(ensure_at_least_two_folders.statusCode).toBe(201)
        
        
        const response = await request(app).get("/api/folders/")
            .set({
                "Content-Type": "application/json"
            })
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBeGreaterThan(0)

        await request(app).delete("/api/folders/" + ensure_at_least_one_folder.body._id)
            .set({
                "Content-Type": "application/json"
            })
        await request(app).delete("/api/folders/" + ensure_at_least_two_folders.body._id)
            .set({
                "Content-Type": "application/json"
            })
    })
})

describe("POST /api/folders", () => {
    it("should post a folder", async () => {
        const folders_before_post = await request(app).get("/api/folders/")
            .set({
                "Content-Type": "application/json"
            })

        const response = await request(app).post("/api/folders")
            .send({
                title: "N",
            })
            .set({
                "Content-Type": "application/json"
            })
        const folders_after_post = await request(app).get("/api/folders/")
            .set({
                "Content-Type": "application/json"
            })
        const delete_response = await request(app).delete("/api/folders/" + response.body._id)
            .set({
                "Content-Type": "application/json"
            })
        expect(delete_response.statusCode).toBe(200)



        const folder_added = (folders_after_post.body.length > folders_before_post.body.length)
        expect(folder_added).toBe(true)

    })
})

describe("DELETE /api/folders/:id", () => {
    it("should delete one folder", async () => {
        const ensure_at_least_one_folder = await request(app).post("/api/folders")
            .send({
                title: "exa"
            })
            .set({
                "Content-Type": "application/json"
            })
        expect(ensure_at_least_one_folder.statusCode).toBe(201)

        const id = ensure_at_least_one_folder.body._id
        const delete_this_folder = await request(app).delete("/api/folders/" + id)
            .set({
                "Content-Type": "application/json"
            })
        expect(delete_this_folder.statusCode).toBe(200)
    })
})

describe("GET /api/folders/:id", () => {
    it("should get one folder", async () => {
        const ensure_at_least_one_folder = await request(app).post("/api/folders")
            .send({
                title: "exa"
            })
            .set({
                "Content-Type": "application/json"
            })
        expect(ensure_at_least_one_folder.statusCode).toBe(201)

        const get_one_folder = await request(app).get("/api/folders/" + ensure_at_least_one_folder.body._id)
        .set({
            "Content-Type": "application/json"
        })
        expect(get_one_folder.statusCode).toBe(200)
        expect(get_one_folder.body._id).toBe(ensure_at_least_one_folder.body._id)
        

        const delete_ensure = await request(app).delete("/api/folders/" + ensure_at_least_one_folder.body._id)
            .set({
                "Content-Type": "application/json"
            })
        expect(delete_ensure.statusCode).toBe(200)
    })
})

describe("PATCH /api/folders/:id", () => {
    it("should patch one folder", async () => {
        const ensure_at_least_one_folder = await request(app).post("/api/folders")
            .send({
                title: "exa"
            })
            .set({
                "Content-Type": "application/json"
            })
        expect(ensure_at_least_one_folder.statusCode).toBe(201)

        const id = ensure_at_least_one_folder.body._id
        const patch_this_folder = await request(app).patch("/api/folders/" + id)
            .send({
                title: "not_exa"
            })
            .set({
                "Content-Type": "application/json"
            })
        expect(patch_this_folder.statusCode).toBe(200)

        const get_one_folder = await request(app).get("/api/folders/" + id)
            .set({
                "Content-Type": "application/json"
            })
        expect(get_one_folder.statusCode).toBe(200)
        expect(get_one_folder.body.title).toBe("not_exa")
        
        
        await request(app).delete("/api/folders/" + ensure_at_least_one_folder.body._id)
            .set({
                "Content-Type": "application/json"
            })
    })
})