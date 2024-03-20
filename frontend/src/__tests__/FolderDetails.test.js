import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FolderDetails from "../components/FolderDetails"
import FolderContextProvider from "../context/FolderContext"
import FolderForm from '../components/FolderForm'

test('renders FolderDetails correctly and functionality works correctly', () => {
    // const folder = {
    //     title: "Test Folder",
    // };
    render(
        <FolderContextProvider >
                <FolderDetails />
        </FolderContextProvider>
    )
    
    // Testing elements in form
    expect(screen.getByText('Test Folder')).toBeInTheDocument()
    expect(screen.getByText('delete', {selector: 'span'})).toBeInTheDocument() 

})