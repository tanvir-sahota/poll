import { useContext } from "react"
import {QuestionResultContext} from "../context/QuestionResultContext";

export const useQuestionResultContext = () => {
    const context = useContext(QuestionResultContext)

    if(!context){
        throw Error("useQuestionResultContext must be used inside an QuestionResultContextProvider")
    }

    return context
}