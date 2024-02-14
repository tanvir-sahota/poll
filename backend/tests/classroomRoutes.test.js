const request = require('supertest');
const express = require('express');
const router = require('../routes/Classroom');
const classroomController = require('../controllers/classroomController');

jest.mock('../controllers/classroomController');

const app = express();
app.use(express.json());
app.use('/', router);

describe('Classroom Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockClassrooms = [
    { _id: '1', owner: 'Alice', title: 'Math Class' },
    { _id: '2', owner: 'Bob', title: 'Science Class' }
  ];

  test('GET', async () => {
    classroomController.getAllClassrooms.mockResolvedValueOnce(mockClassrooms);
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockResponse);
    expect(classroomController.getAllClassrooms).toHaveBeenCalled();
  });

  test('GET /:id ', async () => {
    const mockResponse = mockClassrooms[0];
    classroomController.getClassroomById.mockResolvedValueOnce(mockResponse);
    const response = await request(app).get('/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockResponse);
    expect(classroomController.getClassroomById).toHaveBeenCalledWith(expect.objectContaining({ params: { id: '1' } }), expect.any(Object));
  });

  test('POST', async () => {
    const mockRequestBody = { owner: 'Alice', title: 'Math Class' };
    const mockResponse = { _id: '1', ...mockRequestBody };
    classroomController.createClassroom.mockResolvedValueOnce(mockResponse);
    const response = await request(app).post('/').send(mockRequestBody);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockResponse);
    expect(classroomController.createClassroom).toHaveBeenCalledWith(expect.objectContaining({ body: mockRequestBody }), expect.any(Object));
  });

  test('DELETE /:id', async () => {
    const mockResponse = { msg: 'Virtual classroom removed' };
    classroomController.deleteClassroom.mockResolvedValueOnce(mockResponse);
    const response = await request(app).delete(`/1`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockResponse);
    expect(classroomController.deleteClassroom).toHaveBeenCalledWith(expect.objectContaining({ params: { id: '1' } }), expect.any(Object));
  });
});


// const mongoose = require("mongoose");
// const request = require("supertest");

// const app = require("../server");

// require("dotenv").config();

// /* Connecting to the database before each test. */
// beforeEach(async () => {
//     await mongoose.connect(process.env.MONGO_URI);
//   });
  
//   /* Closing database connection after each test. */
//   afterEach(async () => {
//     await mongoose.connection.close();
//   });

//   describe('GET', () => {
//     it ('should get all the classroom', async() =>{
//         const response = await request(app)
//         .get('')
//     })
//   })