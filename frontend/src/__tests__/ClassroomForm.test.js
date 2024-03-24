import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import ClassroomForm from "../components/ClassroomObject";
import {ClassroomContextProvider} from "../context/ClassroomContext";



const MockClassroom = {
  title:"Test Classroom",
  owner:"Test Owner",
  questions:"Test Questions",
  quizzes:"Test Quizzes",
}

const MockClassroomForm = () => {
  
    return (<ClassroomContextProvider>
        <ClassroomForm classroom={MockClassroom}/>
    </ClassroomContextProvider>)
}

test("Ensures there is a header for classroom creation", () => {
    const classroomForm = render(MockClassroomForm()).container.firstChild
    const createHeader = screen.getByText(/new classroom/)
    expect(createHeader).toBeInTheDocument()
})

describe("classroom title tests", () => {
    test("Ensures there is a label for classroom title", () => {
        const classroomForm = render(MockClassroomForm()).container.firstChild
        const titleLabel = screen.getByText(/title/)
        expect(titleLabel).toBeInTheDocument()
    })

    test("Ensures there is a input for classroom title", () => {
        const classroomForm = render(MockClassroomForm()).container.firstChild
        const titleInput = screen.getByPlaceholderText(/Input the new title/)
        expect(titleInput).toBeInTheDocument()
    })

    test("Ensures we can type in the input for classroom title", () => {
        const classroomForm = render(MockClassroomForm()).container.firstChild
        const titleInput = screen.getByPlaceholderText(/Input the new title/)
        fireEvent.change(titleInput, {target: {value: "test title"}})
        expect(titleInput.value).toBe("test title")
    })
})

describe("classroom submission tests", () => {
    test("Checks whether there is a button to submit the new classroom", () => {
        const classroomForm = render(MockClassroomForm()).container.firstChild
        const submitButton = screen.getByRole("button", {name: /Add Classroom/})
        expect(submitButton).toBeInTheDocument()
    })

    test("tests whether a callback is fired when the form is submitted",  () => {
        const mockCallback = jest.fn()
        const classroomFormMock = render(<ClassroomContextProvider>
            <ClassroomForm onSubmit={mockCallback()}classroom={MockClassroom}/>
        </ClassroomContextProvider>)

        const classroomForm = classroomFormMock.container.firstChild
        fireEvent.submit(classroomForm)
        expect(mockCallback).toHaveBeenCalled()
    })

    test("tests whether a callback is fired when the submission button is pressed",  () => {
        const mockCallback = jest.fn()
        const calssroomFormMock = render(<ClassroomContextProvider>
            <ClassroomForm onSubmit={mockCallback()}classroom={MockClassroom}/>
        </ClassroomContextProvider>)

        fireEvent.click(screen.getByRole("button", {name: /Add Classroom/}))
        expect(mockCallback).toHaveBeenCalled()
    })

})