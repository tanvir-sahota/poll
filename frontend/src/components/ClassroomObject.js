import { useClassroomContext } from "../hooks/useClassroomContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom'

const ClassroomObject = ({ classroom }) => {
    const { dispatch } = useClassroomContext()

    const handleClick = async () => {
      console.log(classroom._id)

      const response = await fetch('http://localhost:4000/classrooms/' + classroom._id, {
        method: 'DELETE'
      })

      const json = await response.json()

      if (response.ok) {
        console.log(json)
        dispatch({type: 'DELETE_CLASSROOM', payload: classroom._id})
        
      }

    }

    return (
      <div class="card-grid">
        <div class="card">
          <div className="classroom-object">
            <Link to="http://localhost:4000/classrooms"><h4>{classroom.title}</h4></Link>
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