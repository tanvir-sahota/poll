import { useClassroomContext } from "../hooks/useClassroomContext"

//import formatDistanceToNow from 'date-fns/formatDistanceToNow'

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
        //dispatch({type: 'DELETE_CLASSROOM', payload: json})
        
      }
    }

    return (
      <div className="classroom-object">
        <h4>{classroom.title}</h4>
        <p><strong>Owner: </strong>{classroom.owner}</p>
        <p><strong>Number of quizzes: </strong>{classroom.quizzes.length}</p>
        <p>{classroom.createdAt}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
      </div>
    )
  }
  
  //<p>{formatDistanceToNow(new Date(classroom.createdAt), { addSuffix: true })}</p>
  
  export default ClassroomObject