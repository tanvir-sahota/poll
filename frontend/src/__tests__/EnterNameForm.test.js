import {render, screen, waitFor} from '@testing-library/react'
import EnterNameForm from '../components/EnterNameForm';
import {WS} from 'jest-websocket-mock'
import userEvent from "@testing-library/user-event";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({lecturer: mockLecturer}),
    useNavigate: () => jest.fn(),
}))

const socket = new WS('websocket://localhost:3000')
socket.emit = function() {
    jest.fn()
}
const emitSpy = jest.spyOn(socket, "emit")
const user = userEvent.setup()
const mockLecturer = "SM"

const MockEnterNameForm = () => {
    return (
        <EnterNameForm socket = {socket}/>
    )
}


beforeEach(() => {
    render(MockEnterNameForm())
})
afterAll(() => {
    socket.close()
})

describe('Appearance', () => {
    test('ensures text area is present', async () => {
        await waitFor(() => {
            expect(screen.queryByRole('textbox')).toBeInTheDocument()
        })
    })
    test('ensures submit button is present', async () => {
        await waitFor(() => {
            expect(screen.queryByRole('button')).toBeInTheDocument()
        })
    })
})

// describe('Functionality to enter a name', () => {
//     test('ensures client can enter a name', () => {

//     })
// })

test('ensures initial emits are sent correctly when page first renders', async() => {        
    const mockResponseCallback = (response) => {
        setHosted(response.isHosting)
    }

    expect(emitSpy).toHaveBeenNthCalledWith(1,"check-hosting-status", mockLecturer, expect.any(Function))
    expect(emitSpy.mock.calls[0][2].toString()).toEqual(mockResponseCallback.toString())
    
    expect(emitSpy).toHaveBeenNthCalledWith(2,"join-room", mockLecturer)
})