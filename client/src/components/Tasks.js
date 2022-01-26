import Navbar from './Navbar';
import RecentTasks from './RecentTasks';
import Form from './Form';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Tasks.css';

function Tasks() {
    const [taskForm, setForm] = useState(false);
    const [taskArr, setTaskArr] = useState([]);
    const toggleForm = () => {
        setForm(!taskForm);
    }

    const fetchTasks = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/task', { credentials: 'include' });
            if (!res.ok) {
                throw new Error('Something went wrong when fetching your tasks')
            } else {
                const tasks = await res.json();
                console.log(tasks)
                setTaskArr(tasks);
            }
        } catch (err) {
            console.log('Oops')
            console.log(err)
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

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
                <Routes>
                    <Route path="/" element={<RecentTasks tasks={taskArr} fetchTasks={fetchTasks} />} />
                </Routes>
            </div>
            {taskForm ? <Form toggleForm={toggleForm} addTask={addTask} /> : null}
        </div>
    )
}

export default Tasks;