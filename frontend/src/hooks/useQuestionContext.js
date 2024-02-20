import { useContext } from "react"
import { QuestionContext } from "../context/QuestionContext"



export const useQuestionContext = () => {
    const context = useContext(QuestionContext)

    if(!context){
        throw Error("useQuestionContext must be used inside an QuestionContextProvider")
    }

    return context
}