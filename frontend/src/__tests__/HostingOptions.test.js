import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import HostingOptions from '../components/hosting/HostingOptions';
import { useClassroomContext } from '../hooks/useClassroomContext';
import HostingAdmin from '../components/hosting/HostingAdmin';

// Mock useClassroomContext hook
jest.mock('../hooks/useClassroomContext', () => ({
  useClassroomContext: jest.fn(),
}));

// Mock HostingAdmin component
jest.mock('../components/hosting/HostingAdmin', () => jest.fn(() => null));

describe('HostingOptions component', () => {
  it('fetches classrooms and renders HostingAdmin component', async () => {
    const mockClassrooms = [
      { _id: '1', title: 'Classroom 1' },
      { _id: '2', title: 'Classroom 2' },
    ];
    const mockInputData = {
      socket: {on : jest.fn(),
        off : jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        emit:jest.fn()},
      lecturer: 'mockLecturer',
      question: 'mockQuestion',
      classID: 'mockClassID'
    };
    const mockDispatch = jest.fn();

    useClassroomContext.mockReturnValue({ classrooms: [], dispatch: mockDispatch });

    // Mock fetchClassrooms function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockClassrooms),
      })
    );

    render(<HostingOptions {...mockInputData} />);

    // Wait for useEffect to execute and fetch classrooms
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_CLASSROOMS', payload: mockClassrooms });

    // Assert that HostingAdmin component is rendered
    expect(HostingAdmin).toHaveBeenCalledWith(expect.objectContaining({
      socket: mockInputData.socket,
      newClassID: mockInputData.classID,
      currentQuestion: mockInputData.question,
      lecturer: mockInputData.lecturer,
    }));
  });
});
