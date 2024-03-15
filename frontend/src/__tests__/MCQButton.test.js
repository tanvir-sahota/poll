import {render, userEvent} from '@testing-library/react'
import MCQButton from '../components/MCQButton'
import {WebSocket} from 'jest-websocket-mock'
jest.mock('websocket', () => require('jest-websocket-mock'))
import userEvent from "@testing-library/user-event";

    const user = userEvent.setup()
    const mockLecturer = "SM"
    const mockOption = "option"
    const websocket = new WebSocket('websocket://localhost:3000')
beforeAll(() => {


})

afterAll(() => {
    websocket.close()

})

test('should submit an MCQ option', async() => {
    render(<MCQButton option={mockOption} socket={websocket} lecturer={mockLecturer}/>)
   
    
    websocket.on('submit-answer-MCQ', (mockLecturer, mockOption) => {
        expect
    })

    await user.click(screen.queryByRole('button'))
})
