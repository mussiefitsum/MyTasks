import Navbar from './Navbar';
import RecentTasks from './RecentTasks';
import Form from './Form';
import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './Tasks.css';

function Tasks() {
    const [taskForm, setForm] = useState(false);
    const toggleForm = () => {
        setForm(!taskForm);
    }
    return (
        <div className="Tasks">
            <Navbar />
            <div className="Tasks-container">
                <button className="Tasks-button" onClick={toggleForm}>+ New Task</button>
                <Routes>
                    <Route path="/" element={<RecentTasks />} />
                </Routes>
            </div>
            {taskForm ? <Form toggleForm={toggleForm} /> : null}
        </div>
    )
}

export default Tasks;