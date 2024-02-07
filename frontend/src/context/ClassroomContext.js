import { createContext, useReducer } from 'react'

export const ClassroomContext = createContext()

export const ClassroomReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CLASSROOMS':
            return {
                classrooms: action.payload
            }
        case 'CREATE_CLASSROOM':
            return {
                classrooms: [action.payload, ...state.classrooms]
            }
        default:
            return state
    }
}

export const ClassroomContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ClassroomReducer, {
        classrooms: null
    })

    return (
        <ClassroomContext.Provider value={{ ...state, dispatch }}>
            { children }
        </ClassroomContext.Provider>
    )
}