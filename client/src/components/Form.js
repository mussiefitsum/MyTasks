import React, { useState } from 'react';
import './Form.css'

function Form({ toggleForm, addTask }) {
    const [task, setTask] = useState({ name: '', description: '', category: '' });
    const handleChange = (evt) => {
        setTask((prevState) => {
            return {
                ...prevState,
                [evt.target.name]: evt.target.value
            }
        })
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const newTask = { ...task, status: 'To Do', date: new Date() };
        addTask(newTask);
        setTask({ name: '', description: '', category: '' });
    }
    const { name, description, category } = task
    return (
        <div className="Form">
            <div className="Form-content">
                <div className="Form-cancel">
                    <i onClick={toggleForm} className="fas fa-times-circle"></i>
                </div>
                <h3>Add A New Task</h3>
                <form className="Form-taskform" onSubmit={handleSubmit}>
                    <div className="Form-group">
                        <label htmlFor="name">Task</label>
                        <br />
                        <input id="name" name="name" type="text" className="Form-input" placeholder="Enter your task" onChange={handleChange} value={name} required />
                    </div>
                    <div className="Form-group">
                        <label htmlFor="description">Description</label>
                        <br />
                        <textarea id="description" name="description" className="Form-description" placeholder="Enter your task description" onChange={handleChange} value={description}></textarea>
                    </div>
                    <div className="Form-group">
                        <label htmlFor="category">Category</label>
                        <br />
                        <select id="category" name="category" className="Form-select" onChange={handleChange} value={category} required>
                            <option value="" disabled>Select a Category</option>
                            <option value="Personal">Personal</option>
                            <option value="Productivity">Productivity</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button className="Form-button">Create Task</button>
                </form>
            </div>
        </div>
    )
}

export default Form;