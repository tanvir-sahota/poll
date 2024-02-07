import { createContext, useReducer } from "react";

export const QuestionContext = createContext()

export const questionsReducer = (state, action) => {
    switch(action.type) {
        case "SET_QUESTIONS":
            return{
                questions: action.payload
            }
        case "CREATE_QUESTIONS":
            return{
                questions: [action.payload, ...state.workouts]
            }
        case "DELETE_QUESTIONS":
            return{
                questions: state.workouts.filter(question => question._id != action.payload._id)
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
