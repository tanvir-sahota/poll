import React from 'react';
import { render, waitFor } from '@testing-library/react';
import HostingOptions from '../components/hosting/HostingOptions';
import HostingAdmin from '../components/hosting/HostingAdmin';
import fetchMock from 'fetch-mock';

// Mock useClassroomContext hook
jest.mock('../hooks/useClassroomContext', () => ({
  useClassroomContext: () => ({dispatch: jest.fn()}),
}));

// Mock HostingAdmin component
jest.mock('../components/hosting/HostingAdmin', () => jest.fn(() => null));


const mockClassrooms = [
  { _id: '1', title: 'Classroom 1' },
  { _id: '2', title: 'Classroom 2' },
];
const mockInputData = {
  socket: {
    on : jest.fn(),
    off : jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    emit:jest.fn()
  },

  lecturer: 'mockLecturer',
  question: 'mockQuestion',
  classID: 'mockClassID'
};


// Mock fetchClassrooms function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockClassrooms),
  })
);

const urlClassrooms = `${process.env.REACT_APP_URL}api/classrooms`






describe('HostingOptions component', () => {
  beforeEach(() => {
    fetchMock.restore()
  })


  it('checks correct url is used to fetch classrooms', async () => {
    fetchMock.mock(urlClassrooms, JSON.stringify(mockClassrooms))
    render(<HostingOptions {...mockInputData} />);
    expect(fetchMock.done()).toEqual(true);
  });

  it('fetches classrooms and renders HostingAdmin component', async () => {
    fetchMock.mock(urlClassrooms, JSON.stringify(mockClassrooms))
    render(<HostingOptions {...mockInputData} />);

    // Assert that HostingAdmin component is rendered
    
    expect(HostingAdmin).toHaveBeenCalledWith(expect.objectContaining({
      socket: mockInputData.socket,
      newClassID: mockInputData.classID,
      currentQuestion: mockInputData.question,
      lecturer: mockInputData.lecturer,
    }), expect.anything());
  });

});
