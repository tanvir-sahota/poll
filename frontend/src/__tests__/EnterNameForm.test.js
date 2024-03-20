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

describe('Functionality', () => {
    test('ensures initial emits are sent correctly when page first renders', async () => {
        expect(emitSpy).toHaveBeenNthCalledWith(1,"check-hosting-status", mockLecturer, expect.any(Function))      
        expect(emitSpy).toHaveBeenNthCalledWith(2,"join-room", mockLecturer)
    })
    // test('ensures event listeners are set up correctly', () => {
        
    // })
    test('ensures username updates when client submits a name', async () => {
        const name = "name"
        await user.type(screen.queryByRole('textbox'), name)
        await user.click(screen.queryByRole('button'))
        await waitFor(() => {
            expect(screen.getByText("Waiting for " + mockLecturer + "'s poll to be activated, " + name + "!").toBeInTheDocument)
        })
    })
    test('ensures username is generated if client submits empty name', async () => {
        const expectedname = "guest1"
        await user.click(screen.queryByRole('button'))        
        await waitFor(() => {
            expect(screen.getByText("Waiting for " + mockLecturer + "'s poll to be activated, " + expectedname + "!").toBeInTheDocument)
        })
    })
})
