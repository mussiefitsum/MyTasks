import React, { useState } from 'react';
import Navbar from './Navbar';
import RecentTasks from './RecentTasks';
import Form from './Form';
import filterTasks from '../utilities/filterTasks';
import './Tasks.css';

function Tasks({ tasks, isLoading, fetchTasks, status, searchTasks }) {
    const [taskForm, setForm] = useState(false);
    const toggleForm = () => {
        setForm(!taskForm);
    }
    let myTasks = filterTasks(tasks, status);

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
                if (res.ok) return res;
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
            <Navbar searchTasks={searchTasks} />
            <div className="Tasks-container">
                <button className="Tasks-button" onClick={toggleForm}>+ New Task</button>
                <RecentTasks tasks={myTasks} fetchTasks={fetchTasks} isLoading={isLoading} status={status} />
            </div>
            {taskForm ? <Form toggleForm={toggleForm} addTask={addTask} /> : null}
        </div>
    )
}

export default Tasks;