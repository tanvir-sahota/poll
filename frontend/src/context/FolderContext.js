import {createContext, useReducer} from "react";

export const FoldersContext = createContext()

/**
 * Performs changes to states based on actions
 * @param state the previous state before the change is made
 * @param action corresponds to the action performed on a folder
 */
export const foldersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FOLDERS':
            return {
                folders: action.payload
            }
        case 'SET_FOLDER':
            return{
                folder: action.payload
            }
        case 'CREATE_FOLDER':
            return {
                folders: [action.payload, ...state.folders]
            }
        case 'DELETE_FOLDER':
            return {
                folders: state.folders.filter((f) => f._id !== action.payload._id)
            }
        default:
            return state
    }
}

/**
 * Wraps around app
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export const FoldersContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(foldersReducer, {
        folders: null
    })


    return (
        <FoldersContext.Provider value={{...state, dispatch}}>
            {children}
        </FoldersContext.Provider>
    )
}