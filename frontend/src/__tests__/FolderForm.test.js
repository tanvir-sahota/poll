import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import FolderForm from "../components/FolderForm";
import {FoldersContextProvider} from "../context/FolderContext";
import FolderDashboard from "../pages/FolderDashboard";
import userEvent from "@testing-library/user-event";
import {useFoldersContext} from "../hooks/useFoldersContext";
import {useState} from "react";

const MockFolderForm = () => {
    return (<FoldersContextProvider>
        <FolderForm/>
    </FoldersContextProvider>)
}

test("Ensures there is a header for folder creation", () => {
    const folderForm = render(MockFolderForm()).container.firstChild
    const createHeader = screen.getByText(/new folder/)
    expect(createHeader).toBeInTheDocument()
})

describe("folder title tests", () => {
    test("Ensures there is a label for folder title", () => {
        const folderForm = render(MockFolderForm()).container.firstChild
        const titleLabel = screen.getByText(/title/)
        expect(titleLabel).toBeInTheDocument()
    })

    test("Ensures there is a input for folder title", () => {
        const folderForm = render(MockFolderForm()).container.firstChild
        const titleInput = screen.getByPlaceholderText(/Input the new title/)
        expect(titleInput).toBeInTheDocument()
    })

    test("Ensures we can type in the input for folder title", () => {
        const folderForm = render(MockFolderForm()).container.firstChild
        const titleInput = screen.getByPlaceholderText(/Input the new title/)
        fireEvent.change(titleInput, {target: {value: "test title"}})
        expect(titleInput.value).toBe("test title")
    })
})

describe("folder submission tests", () => {
    test("Checks whether there is a button to submit the new folder", () => {
        const folderForm = render(MockFolderForm()).container.firstChild
        const submitButton = screen.getByRole("button", {name: /Add Folder/})
        expect(submitButton).toBeInTheDocument()
    })

    test("tests whether a callback is fired when the form is submitted",  () => {
        const mockCallback = jest.fn()
        const folderFormMock = render(<FoldersContextProvider>
            <FolderForm onSubmit={mockCallback()}/>
        </FoldersContextProvider>)

        const folderForm = folderFormMock.container.firstChild
        fireEvent.submit(folderForm)
        expect(mockCallback).toHaveBeenCalled()
    })

    test("tests whether a callback is fired when the submission button is pressed",  () => {
        const mockCallback = jest.fn()
        const folderFormMock = render(<FoldersContextProvider>
            <FolderForm onSubmit={mockCallback()}/>
        </FoldersContextProvider>)

        fireEvent.click(screen.getByRole("button", {name: /Add Folder/}))
        expect(mockCallback).toHaveBeenCalled()
    })

})