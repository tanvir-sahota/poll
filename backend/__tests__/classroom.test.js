require("dotenv").config();

const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const Classroom = require("../models/ClassroomModel");
const classroomController = require("../controllers/classroomController");
const defaultClassroom = require("./fixtures/default_classroom.json");

const app = require("../app");
const server = require("../server");
let classroomID

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  defaultClassroomModel = await Classroom.create(defaultClassroom);
  const response = await request(app)
    .post("/api/classrooms")
    .send({
      title : defaultClassroom.title,
      owner : defaultClassroom.owner,
      questions : defaultClassroom.questions
    })
    .set({
      "Content-Type": "application/json"
    })
    .expect(200)
  classroomID = response.body._id
});

afterAll(async () => {
  await Classroom.deleteOne({title: defaultClassroom.title});
  await Classroom.deleteOne({ title: "Math Classroom" });
  await mongoose.connection.close();
  await server.close()
});

describe("GET /api/classrooms", () => {
  it("should get all the classrooms", async () => {
    const response = await request(app).get("/api/classrooms");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/classrooms/:id", () => {
  it("should get the sample classroom from the database", async () => {
    const response = await request(app)
      .get(`/api/classrooms/${classroomID}`)
    expect(response.statusCode).toBe(200)
  })
})

describe("POST /api/classrooms", () => {
  it("should post a classroom", async () => {
    const title = "Math Classroom";
    const owner = "Math Teacher";
    const questions = "614a1fb0347d4e75f6d6b034";

    const oldNumberOfClassrooms = (await request(app).get("/api/classrooms/")).body.length;

    const response = await request(app).post("/api/classrooms").send({
      title: title,
      owner: owner,
      questions: questions
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(title);

    const newNumberOfClassrooms = (await request(app).get("/api/classrooms/")).body.length;
    const classroomsAdded = newNumberOfClassrooms == oldNumberOfClassrooms + 1;
    expect(classroomsAdded).toBe(true);
  });
});

describe("DELETE /api/classrooms/:id", () => {

  it("should delete the sample classrooms from database", async () => {

    const response = await request(app)
      .delete(`/api/classrooms/${classroomID}`)
      expect(response.statusCode).toBe(200)
  }) 
}) 