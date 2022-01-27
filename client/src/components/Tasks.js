import Navbar from './Navbar';
import RecentTasks from './RecentTasks';
import Form from './Form';
import React, { useState, useEffect } from 'react';
import './Tasks.css';

function Tasks() {
    const [taskForm, setForm] = useState(false);
    const [taskArr, setTaskArr] = useState([]);
    const [isLoading, setLoading] = useState(false);
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
                setTaskArr(tasks);
            }
        } catch (err) {
            console.log('Oops')
            console.log(err)
        }
    }

    const startLoading = () => {
        setLoading(true);
    }

    const stopLoading = () => {
        setLoading(false);
    }

    useEffect(() => {
        startLoading();
        fetchTasks();
        stopLoading();
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
        toggleForm();
        startLoading();
        postTask();
        fetchTasks();
        stopLoading();
    }
    return (
        <div className="Tasks">
            <Navbar />
            <div className="Tasks-container">
                <button className="Tasks-button" onClick={toggleForm}>+ New Task</button>
                <RecentTasks tasks={taskArr} fetchTasks={fetchTasks} startLoading={startLoading} stopLoading={stopLoading} isLoading={isLoading} />
            </div>
            {taskForm ? <Form toggleForm={toggleForm} addTask={addTask} /> : null}
        </div>
    )
}

export default Tasks;