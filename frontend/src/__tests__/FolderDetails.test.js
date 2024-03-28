import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FolderDetails from '../components/folder/FolderDetails';
import { useFoldersContext } from '../hooks/useFoldersContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { FolderContextProvider } from "../context/FolderContext"

jest.mock('../hooks/useFoldersContext', () => ({
  useFoldersContext: jest.fn()
}));

describe('FolderDetails component', () => {
  const mockFolder = {
    _id: '1',
    title:'Mock Folder',
    quizzes: 'quiz 101',
    classroom:'Classroom 101'
  };

  beforeEach(() => {
    useFoldersContext.mockReturnValue({ dispatch: jest.fn() });
  });

  test('renders folder details correctly', () => {
    render(
      <Router>
        <FolderDetails folder={mockFolder} classID="Classroom 101" />
      </Router>
    );

    expect(screen.getByText(mockFolder.title)).toBeInTheDocument();
    expect(screen.getByText('Mock Folder')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();

  });

  test('calls deleteFolder function when delete button is clicked', () => {
    const mockCallback = jest.fn()
    render(
        <Router>
        <FolderDetails folder={mockFolder} classID="Classroom 101" onSubmit={mockCallback()} />
        </Router>
    );
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton)
    expect(mockCallback).toHaveBeenCalled()
  });
});