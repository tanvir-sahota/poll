import {QuizResultsContext} from "../context/QuizResultContext"
import {useContext} from 'react'

export const useQuizResultContext = () => {
    const context = useContext(QuizResultsContext)

    if (!context) {
        throw Error('useQuizResults context must be used inside a QuizResultsContextProvider')
    }
    return context
}
