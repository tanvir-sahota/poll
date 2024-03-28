import { useClassroomContext } from "../../hooks/useClassroomContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import { Button } from "rsuite"

const ClassroomObject = ({ classroom }) => {
    const { dispatch } = useClassroomContext()
    const [ownerUsername, setOwnerUsername] = useState('')
    
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

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
            <p>{formatDistanceToNow(new Date(classroom.createdAt), { addSuffix: true })}</p>
            <div className="deleteIcons">
              <span className="material-symbols-outlined" onClick={handleShow}>Delete</span>
            </div>
          </div>
        </div>
        
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <h4>Are you sure you want to delete this classroom?</h4>
          </Modal.Header>
          <Modal.Body>
            <h6>This will also delete ALL your quizzes and questions in this classroom.</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button id="deleteClassroomButton" onClick={handleClick}>Yes</Button>
            <Button id="notDeleteClassroomButton" onClick={handleClose}>No</Button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
    
  export default ClassroomObject