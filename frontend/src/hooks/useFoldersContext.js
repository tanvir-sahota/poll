import {FoldersContext} from "../context/FolderContext"
import {useContext} from 'react'

export const useFoldersContext = () => {
    const context = useContext(FoldersContext)
    if (!context) {
        throw Error('useFoldersContext must be used inside a FoldersContextProvider')
    }
    return context
}