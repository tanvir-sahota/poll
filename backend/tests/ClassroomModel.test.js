const mongoose = require('mongoose');
const Classroom = require('../models/ClassroomModel');

describe('Classroom Model Test', () => {
  test('should have correct schema properties', () => {
    const schema = Classroom.schema.obj;
    expect(schema.title).toBeDefined();
    expect(schema.title.type).toBe(String);
    expect(schema.title.required).toBe(true);

    expect(schema.owner).toBeDefined();
    expect(schema.owner.type).toBe(String);

    // expect(schema.students).toBeDefined();
    // expect(schema.students[0].type).toBe(mongoose.Schema.Types.ObjectId);

    // expect(schema.quizzes).toBeDefined();
    // expect(schema.quizzes[0].type).toBe(mongoose.Schema.Types.ObjectId);
  });

  test('should have timestamps enabled', () => {
    const options = Classroom.schema.options;
    expect(options.timestamps).toBe(true);
  });
});
