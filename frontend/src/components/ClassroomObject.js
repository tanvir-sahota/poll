import { useClassroomContext } from "../hooks/useClassroomContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

const ClassroomObject = ({ classroom }) => {
    const { dispatch } = useClassroomContext()
    const [ownerUsername, setOwnerUsername] = useState('')

    const fetchOwnerUsername = async (ownerid) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}api/users/id/` + classroom.owner)
        const user = await response.json()

        if (response.ok) {
          setOwnerUsername(user.username)
        } else {
          console.error('Failed to fetch owner details:', user);
        }
      } catch (error) {
        console.error('Error fetching owner details:', error);
      }
    }

    useEffect(() => {
      fetchOwnerUsername(classroom.owner);
    }, [classroom.owner]);

    const handleClick = async () => {
      const response = await fetch(`${process.env.REACT_APP_URL}api/classrooms/` + classroom._id, {
        method: 'DELETE'
      })

      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'DELETE_CLASSROOM', payload: classroom._id})
        
      }

    }

    return (
      <div className="card-grid">
        <div className="card">
          <div className="classroom-object">
            <Link to={`/` + classroom._id + "/classroom"}><h4>{classroom.title}</h4></Link>
            <p><strong>Owner: </strong>{ownerUsername}</p>
            <p><strong>Number of quizzes: </strong>{classroom.quizzes.length}</p>
            <p>{formatDistanceToNow(new Date(classroom.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
          </div>
        </div>
      </div>
    )
  }
  
  //<p>{formatDistanceToNow(new Date(classroom.createdAt), { addSuffix: true })}</p>
  
  export default ClassroomObject