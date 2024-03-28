require("dotenv").config();

const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel.js");
const userController = require("../controllers/userController.js");
const defaultUser = require("./fixtures/default_user.json");

const app = require("../app.js");
const server = require("../server.js");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  defaultUserModel = await User.create(defaultUser);
});

afterAll(async () => {
  await User.deleteOne({ username: defaultUser.username });
  await User.deleteOne({ username: "janedoe" });
  await mongoose.connection.close();
  await server.close();
});

describe("GET /api/users", () => {
  it("should get all the users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("POST /api/users/login", () => {
  it("should post a user to login", async () => {
    const username = defaultUser.username;
    const password = defaultUser.password;

    const response = await request(app).post("/api/users/login").send({
      username: username,
      password: password,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe(username);
  });
});

describe("POST /api/users/login", () => {
  it("should return error 400 as user field is empty", async () => {
    const username = "";
    const password = defaultUser.password;

    const response = await request(app).post("/api/users/login").send({
      username: username,
      password: password,
    });
    expect(response.statusCode).toBe(400);
  });
});

describe("POST /api/users/login", () => {
  it("should return error 400 as password field is empty", async () => {
    const username = defaultUser.username;
    const password = "";

    const response = await request(app).post("/api/users/login").send({
      username: username,
      password: password,
    });
    expect(response.statusCode).toBe(400);
  });
});

describe("POST /api/users/login", () => {
  it("should return error 400 as username and password field is empty", async () => {
    const username = "";
    const password = "";

    const response = await request(app).post("/api/users/login").send({
      username: username,
      password: password,
    });
    expect(response.statusCode).toBe(400);
  });
});

describe("POST /api/users/login", () => {
  it("should return error 400 as the no such user exists", async () => {
    const username = "notexistsasausername";
    const password = "notexistsasapassword";

    const response = await request(app).post("/api/users/login").send({
      username: username,
      password: password,
    });
    expect(response.statusCode).toBe(400);
  });
});
