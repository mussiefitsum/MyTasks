import React, { useState } from 'react';
import Navbar from './Navbar';
import RecentTasks from './RecentTasks';
import Form from './Form';
import filterTasks from '../utilities/filterTasks';
import categorizeTasks from '../utilities/categorizeTasks';
import baseUrl from '../utilities/baseUrl';
import './Tasks.css';

function Tasks({ tasks, toggleSidebar, isLoading, fetchTasks, status, searchTasks, category }) {
    const [taskForm, setForm] = useState(false);
    const toggleForm = () => {
        setForm(!taskForm);
    }
    let myTasks = filterTasks(tasks, status);
    let finalTasks = categorizeTasks(myTasks, category)

    const addTask = async (task) => {
        const postTask = async () => {
            try {
                const res = await fetch(`${ baseUrl }/api/task`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ task: task })
                });
                if (res.ok) return res;
            } catch (e) {
                console.log(e);
            }
        }
        await postTask();
        fetchTasks();
        toggleForm();
    }
    return (
        <div className="Tasks">
            <Navbar searchTasks={searchTasks} toggleSidebar={toggleSidebar} />
            <div className="Tasks-container">
                <button className="Tasks-button" onClick={toggleForm}>+ New Task</button>
                <img crossorigin="" className="Tasks-mobile-button" onClick={toggleForm} src="https://res.cloudinary.com/dfuxr1p10/image/upload/v1644173293/MyTasks/plus_vxavqx.png" alt="Add Task Button" />
                <RecentTasks tasks={finalTasks} fetchTasks={fetchTasks} isLoading={isLoading} status={status} category={category} />
            </div>
            {taskForm ? <Form toggleForm={toggleForm} addTask={addTask} /> : null}
        </div>
    )
}

export default Tasks;