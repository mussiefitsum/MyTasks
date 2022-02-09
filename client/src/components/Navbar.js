import React, { useState } from 'react';
import baseUrl from '../utilities/baseUrl'
import './Navbar.css'

function Navbar({ searchTasks, toggleSidebar }) {
    const [taskSearch, setTaskSearch] = useState('');
    const handleChange = (evt) => {
        searchTasks(evt.target.value);
        setTaskSearch(evt.target.value);
    }
    return (
        <div className="Navbar">
            <div className="Navbar-item Navbar-menu-toggle">
                <i className="fas fa-bars Navbar-toggle" onClick={toggleSidebar}></i>
            </div>
            <div className="Navbar-item">
                <div className="Navbar-input">
                    <i className="fas fa-search"></i>
                    <input type="text" className="Navbar-search" onChange={handleChange} value={taskSearch} placeholder="Search for tasks" />
                </div>
            </div>
            <div className="Navbar-item Navbar-logout">
                <a href={`${ baseUrl }/logout`}>Logout</a>
            </div>
        </div>
    )
}

export default Navbar