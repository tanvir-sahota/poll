import { useContext } from 'react'
import { ClassroomContext } from '../context/ClassroomContext'

export const useClassroomContext = () => {
    const context = useContext(ClassroomContext)

    if(!context) {
        throw Error("useClassroomContext has to be used inside a ClassroomContextProvider")
    }

    return context
}