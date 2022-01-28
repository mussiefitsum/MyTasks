import Navbar from './Navbar';
import RecentTasks from './RecentTasks';
import Form from './Form';
import React, { useState } from 'react';
import './Tasks.css';

function Tasks({ tasks, isLoading, fetchTasks }) {
    const [taskForm, setForm] = useState(false);
    const toggleForm = () => {
        setForm(!taskForm);
    }

    const addTask = (task) => {
        const postTask = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/task', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                });
                const data = await res.json();
                console.log(data);
            } catch (e) {
                console.log(e);
            }
        }
        postTask();
        fetchTasks();
        toggleForm();
    }
    return (
        <div className="Tasks">
            <Navbar />
            <div className="Tasks-container">
                <button className="Tasks-button" onClick={toggleForm}>+ New Task</button>
                <RecentTasks tasks={tasks} fetchTasks={fetchTasks} isLoading={isLoading} />
            </div>
            {taskForm ? <Form toggleForm={toggleForm} addTask={addTask} /> : null}
        </div>
    )
}

export default Tasks;