import { useEffect, useState } from 'react'
import { useClassroomContext } from '../hooks/useClassroomContext'
import ClassroomDropdown from './ClassroomDropdown'
import HostingAdmin from './HostingAdmin'

const HostingOptions = (inputData) =>{
    const {socket, userName, question, classID} = inputData    
    //future change requires only users classrooms to be made 


    const { classrooms, dispatch } = useClassroomContext()
    const [ showButtons, setShowButtons ] = useState(true)
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

    const handlePress = () => {
        setShowButtons(false)
    }
    //console.log(socket)


    return(
        <div className="hostingOptions">    
            {/* <h4>Classrooms</h4>           
            <div className="classrooms">
                {classrooms && classrooms.map(classroom => (
                    <div key={classroom._id}>
                        {showButtons ? 
                            <button onClick={handlePress}>{classroom.title}</button>
                        : 
                            // <ClassroomDropdown newClassID = {classroom._id}></ClassroomDropdown>
                            null
                            
                        }
                        
                    </div>
                ))}
            </div> */}
            <HostingAdmin socket = {socket} newClassID = {IDReceived} currentQuestion = {questionReceived} userName={userName}/>
        </div>
    )
}

export default HostingOptions