import { useEffect } from 'react'
import { useClassroomContext } from '../hooks/useClassroomContext'
import ClassroomObject from '../components/ClassroomObject'
import ClassroomForm from '../components/forms/ClassroomForm'

const Dashboard = () => {

    const { classrooms, dispatch } = useClassroomContext()

    useEffect(() => {
        const fetchClassrooms = async () => {
            const response = await fetch('http://localhost:4000/classrooms')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_CLASSROOMS', payload: json})
            }
        }

        fetchClassrooms()

        }, [dispatch])

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="classrooms">
                {classrooms && classrooms.map(classroom => (
                    <ClassroomObject classroom={classroom} key={classroom._id} />
                ))}
            </div>
            <ClassroomForm />
        </div>
         
    )
}

export default Dashboard