import { useEffect } from 'react'
import { useClassroomContext } from '../hooks/useClassroomContext'
import ClassroomObject from '../components/ClassroomObject'
import ClassroomForm from '../components/forms/ClassroomForm'

const Dashboard = () => {

    const { classrooms, dispatch } = useClassroomContext()
    const token = JSON.parse(localStorage.getItem('user'))?.token

    useEffect(() => {
        const fetchClassrooms = async () => {
            if (!token) {
                console.warn('No user is signed in. Token is null.')
                window.location.href = '/' // redirects if no token
                return
            }

            const response = await fetch(`${process.env.REACT_APP_URL}api/classrooms/` + token)
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
            <ClassroomForm />
           
            <div className="classrooms">
                {classrooms && classrooms.map(classroom => (
                    <ClassroomObject classroom={classroom} key={classroom._id} />
                ))}
            </div>
        </div>
         
    )
}

export default Dashboard