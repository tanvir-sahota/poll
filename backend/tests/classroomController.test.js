const { getAllClassrooms, getClassroomById, createClassroom, deleteClassroom } = require('../controllers/classroomController');
const ClassroomModel = require('../models/ClassroomModel');
jest.mock('../models/ClassroomModel');

describe('Classroom Controller Tests', () => {
    // Mock data for testing
    const mockClassrooms = [
      { _id: '1', owner: 'Alice', title: 'Math Class' },
      { _id: '2', owner: 'Bob', title: 'Science Class' }
    ];

    test('getAllClassrooms - should return all classrooms', async () => {
        ClassroomModel.find.mockResolvedValue(mockClassrooms);
    
        const req = {};
        const res = {
          json: jest.fn()
        };
    
        await getAllClassrooms(req, res);
    
        expect(res.json).toHaveBeenCalledWith(mockClassrooms);
      });

      test('getClassroomById - should return classroom by ID', async () => {
        const id = '1';
        const mockClassroom = mockClassrooms[0];
    
        ClassroomModel.findById.mockResolvedValue(mockClassroom);
    
        const req = { params: { id: id } };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis()
        };
    
        await getClassroomById(req, res);
    
        expect(res.json).toHaveBeenCalledWith(mockClassroom);
      });

      test('createClassroom - should create a new classroom', async () => {
        const mockNewClassroom = { _id :'1',owner: 'testOwner', title: 'testTitle' };
        // ClassroomModel.mockReturnValueOnce({
        //   save: jest.fn().mockResolvedValueOnce(mockNewClassroom)
        // });
        ClassroomModel.updateOne(mockNewClassroom);
 

        const req = { body: { owner: 'testOwner', title: 'testTitle'}};
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        };
    
        await createClassroom(req, res);
    
        expect(res.json).toHaveBeenCalledWith(mockNewClassroom);
      });

      test('deleteClassroom - should delete a classroom by ID', async () => {
        const mockId = '1';
        const mockClassroom = mockClassrooms[0];
    
        const req = { params: { id: mockId } };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        };
        ClassroomModel.findById.mockResolvedValue(mockClassroom);
        ClassroomModel.deleteOne.mockResolvedValue({});
    
        await deleteClassroom(req, res);
    
        expect(res.json).toHaveBeenCalledWith({ msg: 'Virtual classroom removed' });
      });
});
