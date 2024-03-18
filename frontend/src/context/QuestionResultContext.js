import { createContext, useReducer } from "react";

export const QuestionContext = createContext()

export const questionsReducer = (state, action) => {
    switch(action.type) {
        case "SET_QUESTION_RESULTS":
            return{
                questions: action.payload
            }
        case "CREATE_QUESTION_RESULTS":
            return{
                questions: [action.payload, ...state.questions]
            }
        case "DELETE_QUESTION_RESULTS":
            return{
                questions: state.questions.filter(question => question._id != action.payload._id)
            }
        case "UPDATE_QUESTION_RESULTS":
            return{
                questions: [action.payload, ...state.questions.filter(question => question._id != action.payload._id)]
            }
        default:
            return state
    }
} 


export const QuestionContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(questionsReducer, {
        questions: null
    })

    return(
        <QuestionContext.Provider value = {{...state, dispatch}}>
            {children}
        </QuestionContext.Provider>
    )
}
