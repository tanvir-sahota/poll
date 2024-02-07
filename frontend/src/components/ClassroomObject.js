import { useClassroomContext } from "../hooks/useClassroomContext"

//import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ClassroomObject = ({ classroom }) => {
    const { dispatch } = useClassroomContext()

    const handleClick = async () => {
      const response = await fetch('/classrooms/' + classroom._id, {
        method: 'DELETE'
      })

      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'DELETE_WORKOUT', payload: json})
      }
    }

    return (
      <div className="classroom-object">
        <h4>{classroom.title}</h4>
        <p><strong>Owner: </strong>{classroom.owner}</p>
        <p><strong>Number of quizzes: </strong>{classroom.quizzes.length}</p>
        <p>{(new Date(classroom.createdAt), { addSuffix: true })}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
      </div>
    )
  }

  //<p>{formatDistanceToNow(new Date(classroom.createdAt), { addSuffix: true })}</p>
  
  export default ClassroomObject