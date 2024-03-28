import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import ClassroomForm from "../components/classroom/ClassroomObject";
import {ClassroomContextProvider} from "../context/ClassroomContext";
import { BrowserRouter } from 'react-router-dom';



const MockClassroom = {
  title:"Test Classroom",
  owner:"Test Owner",
  questions:"Test Questions",
  quizzes:"Test Quizzes",
}

const MockClassroomForm = () => {
  
    return (<ClassroomContextProvider>
      <BrowserRouter>
      <ClassroomForm classroom={MockClassroom}/>
      </BrowserRouter>
    </ClassroomContextProvider>)
}


describe("classroom details tests", () => {
    test("Ensures classroom detail is correct", () => {
        const classroomForm = render(MockClassroomForm()).container.firstChild
        expect(screen.getByText('Test Classroom')).toBeInTheDocument()
        expect(screen.getByText('Owner:')).toBeInTheDocument();
        expect(screen.getByText('Number of quizzes:')).toBeInTheDocument()
    })
})

    test('calls deleteClassroom function when delete button is clicked', () => {
        const mockCallback = jest.fn()
        render(
            <ClassroomContextProvider>
            <BrowserRouter>
            <ClassroomForm classroom={MockClassroom} onSubmit={mockCallback()} />
            </BrowserRouter>
            </ClassroomContextProvider>
        );
        const deleteButton = screen.getByText('Delete');
        fireEvent.click(deleteButton)
        expect(mockCallback).toHaveBeenCalled()
    });