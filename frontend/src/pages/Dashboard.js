import React, { useState } from 'react';
import { useEffect } from 'react'
import { useClassroomContext } from '../hooks/useClassroomContext'
import ClassroomObject from '../components/ClassroomObject'
import ClassroomForm from '../components/forms/ClassroomForm'
import Dropdown from 'react-bootstrap/Dropdown'

const Dashboard = () => {

    const { classrooms, dispatch } = useClassroomContext()
    const token = JSON.parse(localStorage.getItem('user'))?.token

    const [filteredClassrooms, setFilteredClassrooms] = useState(classrooms || [])

    const filterBySearch = (event) => {
        const inputValue = event.target.value.toLowerCase()
        const filtered = classrooms.filter(classroom =>
            classroom.title.toLowerCase().includes(inputValue)
        );
        setFilteredClassrooms(filtered)
    }

    const filterByTime = (type) => {
        const sortedClassrooms = [...(classrooms || [])].sort((a, b) => {
            return type === 'mostRecent' ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt);
        });
        setFilteredClassrooms(sortedClassrooms);
    }

    useEffect(() => {
        setFilteredClassrooms(classrooms || []);
    }, [classrooms])

    useEffect(() => {
        const fetchClassrooms = async () => {
            if (!token) {
                console.warn('No user is signed in. Token is null.')
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
           
           <div className="container">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="col-sm-12 mb-3">
                    <input
                            type="text"
                            id="filter"
                            className="form-control"
                            onKeyUp={filterBySearch}
                            placeholder="Search for classrooms..."
                            
                        />
                    </div>
                    <div style={{ marginBottom: 15}}>
                        <Dropdown>
                            <Dropdown.Toggle  id="filter_tasks_by" variant="btn filter-by dropdown-toggle">
                                Filter by...
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => filterByTime('mostRecent')}>Most Recent</Dropdown.Item>
                                <Dropdown.Item onClick={() => filterByTime('oldest')}>Oldest</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            <div className="classrooms">
                {filteredClassrooms.map(classroom => (
                    <ClassroomObject classroom={classroom} key={classroom._id} />
                ))}
            </div>
            </div>
        </div>
         
    )
}

export default Dashboard