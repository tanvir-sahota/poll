import { useEffect } from 'react'
import { useClassroomContext } from '../hooks/useClassroomContext'
import ClassroomDropdown from './ClassroomDropdown'

const HostingOptions = (userID) =>{
    
    //future change requires only users classrooms to be made 

    const { classrooms, dispatch } = useClassroomContext()

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


    return(
        <div className="hostingOptions">    
            <h4>Classrooms</h4>           
            <div className="classrooms">
                {classrooms && classrooms.map(classroom => (
                    <div key={classroom._id}>
                        <label htmlFor="hostingDropdown">{classroom.title}</label>

                        <select name="hostingDropdown" id="hostingDropdown">
                            <ClassroomDropdown classID={classroom._id}></ClassroomDropdown>
                        </select>
                    </div>
                    ))
                }
            </div>
        </div>
    )
}

export default HostingOptions