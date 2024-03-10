import { useClassroomContext } from '../../hooks/useClassroomContext'
import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import "rsuite/dist/rsuite.min.css";
import { IconButton } from "rsuite"; 
import { Plus } from '@rsuite/icons';
import Button from 'react-bootstrap/Button'
//import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
//import { CgAddR } from "react-icons/cg"

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
        console.log(owner)

        const response = await fetch('http://localhost:4000/api/classrooms', {
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
            setOwner('')
            dispatch({type: 'CREATE_CLASSROOM', payload: json})
            handleClose()
          }

    }

    return (

        /*<div>
            <Button variant="primary" onClick={handleShow}>
                Add Classroom
                {error && <div className="error">{error}</div>}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header></Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="create" controlId="exampleForm.ControlInput1">
                    <Form.Label>Class Name:</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title}
                        className={emptyFields.includes('title') ? 'error' : ''}
                    />
                    </Form.Group>
                    <Form.Group className="mb-3"controlId="exampleForm.ControlTextarea1">
                    <Form.Label></Form.Label>
                    <Form.Control 
                        type="text"
                        onChange={(e) => setOwner(e.target.value)} 
                        value={owner}
                        className={emptyFields.includes('owner') ? 'error' : ''}
                    />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Add Classroom
                </Button>
                </Modal.Footer>
            </Modal>
        </div>*/

        <div>
            <IconButton className="add" icon={<Plus />} color="yellow" onClick={handleShow}
                appearance="primary" 
            />
    
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <h4>Create new classroom</h4>
                    <span className="material-symbols-outlined" onClick={handleClose}>Close</span>
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
                        {error && <div className="error">{error}</div>}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

        /*<form className="create" onSubmit={handleSubmit}>
            <h3>Add a new classroom</h3>
            <label>Class Name:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Owner:</label>
            <input 
                type="text"
                onChange={(e) => setOwner(e.target.value)} 
                value={owner}
                className={emptyFields.includes('owner') ? 'error' : ''}
            />
            <button type="submit">Add Classroom</button>
            {error && <div className="error">{error}</div>}
        </form>*/
    )
}

export default ClassroomForm