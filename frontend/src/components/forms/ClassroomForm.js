import { useClassroomContext } from '../../hooks/useClassroomContext'
import { useState } from 'react'

const ClassroomForm = () => {
    const { dispatch } = useClassroomContext()

    const [title, setTitle] = useState('')
    const [owner, setOwner] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const classroom = {title, owner}

        const response = await fetch('http://localhost:4000/classrooms', {
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
          }

    }

    return (
        <form className="create" onSubmit={handleSubmit}>
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
        </form>
    )
}

export default ClassroomForm