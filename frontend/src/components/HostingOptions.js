import { useEffect, useState } from 'react'
import { useClassroomContext } from '../hooks/useClassroomContext'
import ClassroomDropdown from './ClassroomDropdown'
import HostingAdmin from './HostingAdmin'

const HostingOptions = (userID, question) =>{
    
    //future change requires only users classrooms to be made 

    const { classrooms, dispatch } = useClassroomContext()
    const [ showButtons, setShowButtons ] = useState(true)
    const questionReceived = userID.question

    useEffect(() => {
        const fetchClassrooms = async () => {
            const response = await fetch('http://localhost:4000/api/classrooms')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_CLASSROOMS', payload: json})
            }
        }

        fetchClassrooms()

        }, [dispatch])

    const handlePress = () => {
        setShowButtons(false)
    }


    return(
        <div className="hostingOptions">    
            <h4>Classrooms</h4>           
            <div className="classrooms">
                {classrooms && classrooms.map(classroom => (
                    <div key={classroom._id}>
                        {showButtons ? 
                            <button onClick={handlePress}>{classroom.title}</button>
                        : 
                            // <ClassroomDropdown newClassID = {classroom._id}></ClassroomDropdown>
                            null
                            
                        }
                        <HostingAdmin newClassID = {classroom._id} currentQuestion = {questionReceived}></HostingAdmin>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HostingOptions