import { useClassroomContext } from '../../hooks/useClassroomContext'
import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import "rsuite/dist/rsuite.min.css";
import { IconButton } from "rsuite"; 
import { Plus } from '@rsuite/icons';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ClassroomForm = () => {
    const { dispatch } = useClassroomContext()

    const [title, setTitle] = useState('')
    const [owner, setOwner] = useState(localStorage.getItem('user'))
    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState(null)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const classroom = {owner, title}


        const response = await fetch(`${process.env.REACT_APP_URL}api/classrooms`, {
            method: 'POST',
            body: JSON.stringify(classroom),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setEmptyFields([])
            setError(null)
            setTitle('')
            setOwner(localStorage.getItem('user'))
            dispatch({type: 'CREATE_CLASSROOM', payload: json})
            handleClose()
          }

    }

    return (
        <div>
            <IconButton className="add" icon={<Plus />} color="yellow" onClick={handleShow}
                appearance="primary">Create Classroom</IconButton> 
            
    
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <h4>Create new classroom</h4>
                    <div className="closeIcon">
                        <span className="material-symbols-outlined" onClick={handleClose}>Close</span>
                    </div>
                </Modal.Header>
                <Modal.Body>
                <form className="create" onSubmit={handleSubmit}>
                    
                    <input 
                        type="text"
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Enter name"
                        value={title}
                        className={emptyFields.includes('title') ? 'error' : ''}
                    />
        
                </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Create classroom
                    </Button>
                    {error && <div className="error">{error}</div>}
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ClassroomForm