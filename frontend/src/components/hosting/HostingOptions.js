import { useEffect } from 'react'
import { useClassroomContext } from '../../hooks/useClassroomContext'
import HostingAdmin from './HostingAdmin'

const HostingOptions = (inputData) =>{
    const {socket, lecturer, question, classID} = inputData    
    const { classrooms, dispatch } = useClassroomContext()
    const questionReceived = question
    const IDReceived = classID
    

    useEffect(() => {
        const fetchClassrooms = async () => {
            const response = await fetch(`${process.env.REACT_APP_URL}api/classrooms`)
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_CLASSROOMS', payload: json})
            }
        }

        fetchClassrooms()

        }, [dispatch])

    return(
        <div className="hostingOptions">    
            <HostingAdmin socket = {socket} newClassID = {IDReceived} currentQuestion = {questionReceived} lecturer={lecturer}/>
        </div>
    )
}

export default HostingOptions