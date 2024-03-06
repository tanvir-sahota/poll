import { useClassroomContext } from "../hooks/useClassroomContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom'

const ClassroomObject = ({ classroom }) => {
    const { dispatch } = useClassroomContext()

    const handleClick = async () => {
      const response = await fetch(`${process.env.REACT_APP_URL}api/classrooms/` + classroom._id, {
        method: 'DELETE'
      })

      const json = await response.json()

      if (response.ok) {
        console.log(json)
        dispatch({type: 'DELETE_CLASSROOM', payload: classroom._id})
        
      }

    }

    return (
      <div className="card-grid">
        <div className="card">
          <div className="classroom-object">
            <Link to={`/` + classroom._id + "/classroom"}><h4>{classroom.title}</h4></Link>
            <p><strong>Owner: </strong>Me</p>
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