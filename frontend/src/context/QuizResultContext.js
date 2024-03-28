import {createContext, useReducer} from "react";

export const QuizResultsContext = createContext()
/**
 * Performs changes to states based on actions
 * @param state the previous state before the change is made
 * @param action corresponds to the action performed on a quiz
 */
export const quizResultReducer = (state, action) => {
    switch (action.type) {
        case 'SET_QUIZ_RESULTS':
            return {
                quiz_results: action.payload
            }
        case 'SET_QUIZ_RESULT':
            return{
                quiz_result: action.payload
            }
        case 'CREATE_QUIZ_RESULT':
            return {
                quiz_result: [action.payload, ...state.quiz_result]
            }
        case 'DELETE_QUIZ_RESULT':
            return {
                quiz_result: state.quiz_result.filter((q) => q._id !== action.payload._id)
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
export const QuizResultsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(quizResultReducer, {
        quiz_results: null
    })

    return (
        <QuizResultsContext.Provider value={{...state, dispatch}}>
            {children}
        </QuizResultsContext.Provider>
    )
}