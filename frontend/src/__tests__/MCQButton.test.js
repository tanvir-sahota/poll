import React from "react"
import { fireEvent, render, waitFor } from "@testing-library/react"
import MCQButton from "../components/MCQButton"
import io from "socket.io-client"
import {WebSocket} from 'mock-socket'


//create a mock lecturer and mock option
const mockLecturer = "SM"
const mockOption = "option"



jest.mock('socket.io-client')



//mock a web socket
const mockSocket = new WebSocket("ws://localhost:3000")
mockSocket.emit = function () {jest.fn()}

//check if the submit mcq works
test('submitMCQAnswer emits correct message', async () => {
    const { getByRole } = render(<MCQButton option={mockOption} socket={mockSocket} lecturer={mockLecturer} />)

    const mockEmit = jest.fn()
    io.mockImplementation(() => ({
        emit: mockEmit,
        // on: jest.fn(),
        // off: jest.fn(),
        // close: jest.fn(),
    }))

    //get the button
    const submit = getByRole("button")
    //get the button click
    fireEvent.click(submit)

    //expect the web socket to work
    await waitFor(() =>{
        expect(mockEmit).toHaveBeenCalledWith("submit-answer-MCQ")
    })
    
})