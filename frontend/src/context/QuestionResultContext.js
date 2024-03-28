import { createContext, useReducer } from "react";

export const QuestionResultContext = createContext()

export const questionResultsReducer = (state, action) => {
    switch(action.type) {
        case "SET_QUESTION_RESULTS":
            return{
                question_results: action.payload
            }
        case "SET_QUESTION_RESULT":
            return{
                question_result: action.payload
            }
        case "CREATE_QUESTION_RESULTS":
            return{
                question_results: [action.payload, ...state.question_results]
            }
        case "DELETE_QUESTION_RESULTS":
            return{
                question_results: state.question_results.filter(question => question._id !== action.payload._id)
            }
        case "UPDATE_QUESTION_RESULTS":
            return{
                question_results: [action.payload, ...state.question_results.filter(question => question._id !== action.payload._id)]
            }
        default:
            return state
    }
} 

export const QuestionResultsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(questionResultsReducer, {
        question_results: null
    })

    return(
        <QuestionResultContext.Provider value = {{...state, dispatch}}>
            {children}
        </QuestionResultContext.Provider>
    )
}
