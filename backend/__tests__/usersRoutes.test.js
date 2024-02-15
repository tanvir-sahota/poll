require("dotenv").config();

const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const userController = require("../controllers/userController");
const defaultUser = require("./fixtures/default_user.json");

const app = require("../app.js");
const server = require("../server.js");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  defaultUserModel = await User.create(defaultUser);
});

afterAll(async () => {
  await User.deleteOne({username: defaultUser.username});
  await User.deleteOne({ username: "janedoe" });
  await mongoose.connection.close();
  await server.close()
});

describe("GET /api/users", () => {
  it("should get all the users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("POST /api/users", () => {
  it("should post a user", async () => {
    const username = "janedoe";
    const password = "$2b$10$1sG4DFGZRLaxdABGJTP1E.NHIRpt2Fqt1eJpzD4r8pTAtU8Fqw7c.";

    const oldNumberOfUsers = (await request(app).get("/api/users/")).body.length;

    const response = await request(app).post("/api/users").send({
      username: username,
      password: password,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe(username);

    const newNumberOfUsers = (await request(app).get("/api/users/")).body.length;
    const userAdded = newNumberOfUsers == oldNumberOfUsers + 1;
    expect(userAdded).toBe(true);
  });
});
