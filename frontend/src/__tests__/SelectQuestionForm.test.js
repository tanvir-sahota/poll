import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import fetchMock, { post } from 'fetch-mock'

import ShowSelectQuestion from "../components/ShowSelectQuestion";

import userEvent from "@testing-library/user-event";
import { act } from 'react-dom/test-utils';


// mock models

const mockClassroom = {
    _id: "classroom_id",
    title: "mclassroom",
    questions: "question_bank_id",
    quizzes: ["quiz_id"],
}

const mockQuiz = {
    _id: "quiz_id",
    title: "mquiz",
}

const mockQuestion = {
    _id: "question_id",
    question: "question",
    answers: [""],
    questionType: "mockType",
}


// mock select_question forms

const MockSQForm_with_questions = () => {
    return (
        <ShowSelectQuestion classroom_id={mockClassroom._id} quiz_id={mockQuiz._id} />
    )
}
const MockSQForm_no_classroom = () => {
    return (
        <ShowSelectQuestion/>
    )
}
const MockSQForm_no_quiz = () => {
    return (
        <ShowSelectQuestion classroom_id={mockClassroom._id}/>
    )
}

const url = `${process.env.REACT_APP_URL}api/questions/` + mockClassroom._id
const select_questions_toggle = "Select Questions Below"
const user = userEvent.setup()





// test for show_select_question with no class_id 

test("Ensures correct text is shown when no classroom_id is given", () => {
    render(MockSQForm_no_classroom())
    const text_no_classroom_linked = screen.getByText("No classroom linked to this quiz.")
    expect(text_no_classroom_linked).toBeInTheDocument()
})






// test for show_select_question with no quiz_id 

test("Ensures correct text is shown when no quiz_id is given", () => {
    render(MockSQForm_no_quiz())
    const text_no_quiz_to_update = screen.getByText("No quiz to update.")
    expect(text_no_quiz_to_update).toBeInTheDocument()
})





// tests for select_question_form without questions

describe("Appearance test before questions are fetched", () => {
    test("Ensures there is loading text for question fetching", () => {
        render(MockSQForm_with_questions())
        const loading_text = screen.getByText("Loading questions...")
        expect(loading_text).toBeInTheDocument()
    })
})



// tests for select_question_form with questions


beforeEach(() => {
    fetchMock.restore()
})
describe("Appearance test after questions are fetched (questions and classroom provided)", () => {
    const wait_for_fetch_questions = async (check_this_string) => {
        await waitFor(() => {
            expect(screen.getByText(check_this_string)).toBeInTheDocument()
        })
    }

    beforeEach(async () => {
        fetchMock.mock(url, JSON.stringify([mockQuestion]))
        await act(async () => {    
            render(MockSQForm_with_questions())
        })
    })

    test("Ensures toggle button shows for selecting questions", async () => {
        await wait_for_fetch_questions(select_questions_toggle)        
    })
    test("Ensures submit button shows for selecting questions", async () => {
        const submit_button = "Select Questions"
        
        await user.click(screen.getByText(select_questions_toggle))
        await wait_for_fetch_questions(submit_button)        
    })
    test("Ensures checkbox text shows for selecting one question", async () => {
        const question_checkbox = "question"
        
        await user.click(screen.getByText(select_questions_toggle))
        await wait_for_fetch_questions(question_checkbox)
    })
    test("Ensures checkbox itself shows for selecting one question", async () => {
        const question_checkbox = "question"
        
        await user.click(screen.getByText(select_questions_toggle))
        await wait_for_fetch_questions(question_checkbox)
        await waitFor(() => {
            expect(screen.queryByRole('checkbox')).toBeInTheDocument()
        })
    })
})

describe("Ensure requests are sent properly when patching quizzes", () => {
    const get_quiz_url = `${process.env.REACT_APP_URL}api/quizzes/`+ mockQuiz._id
    
    test("Ensures GET and PATCH requests consecutively sent after submit is clicked", async() => {
        fetchMock.mock(url, JSON.stringify([mockQuestion]))
        await act(async () => {    
            render(MockSQForm_with_questions())
        })
        
        fetchMock.get(get_quiz_url, JSON.stringify(mockQuiz))
        fetchMock.patch(get_quiz_url, JSON.stringify(mockQuiz))
        
        await user.click(screen.getByText(select_questions_toggle))
        await user.click(screen.queryByRole('checkbox'))
        await user.click(screen.queryByRole('button'))
    })
})

// describe("Ensure requests are NOT sent properly with incorrect arguments", () => {
//     const get_quiz_url = "http://localhost:4000/api/quizzes/" + mockQuiz._id
    
//     test("Ensures GET request is not sent after submit is clicked", async() => {
//         fetchMock.mock(url, JSON.stringify([mockQuestion]))
//         await act(async () => {    
//             render(MockSQForm_with_questions())
//         })
        
//         fetchMock.patch(get_quiz_url, JSON.stringify(mockQuiz))
        
//         await user.click(screen.getByText(select_questions_toggle))
//         await user.click(screen.queryByRole('checkbox'))
//         await user.click(screen.queryByRole('button'))


        
//     })
//     // test("Ensures PATCH request is not sent after submit is clicked", async() => {
//     //     fetchMock.mock(url, JSON.stringify([mockQuestion]))
//     //     await act(async () => {    
//     //         render(MockSQForm_with_questions())
//     //     })
        
//     //     fetchMock.get(get_quiz_url, JSON.stringify(mockQuiz))
        
//     //     await user.click(screen.getByText(select_questions_toggle))
//     //     await user.click(screen.queryByRole('checkbox'))
//     //     await user.click(screen.queryByRole('button'))
//     // })
// })