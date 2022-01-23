import React, { useState } from 'react';
import './Navbar.css'

function Navbar() {
    const [taskSearch, setTaskSearch] = useState('');
    const handleChange = (evt) => {
        setTaskSearch(evt.target.value);
    }
    return (
        <div className="Navbar">
            <div className="Navbar-item">
                <div className="Navbar-input">
                    <i className="fas fa-search"></i>
                    <input type="text" className="Navbar-search" onChange={handleChange} value={taskSearch} placeholder="Search for tasks" />
                </div>
            </div>
            <div className="Navbar-item">
                <a className="Navbar-logout" href="http://localhost:3001/logout">Logout</a>
            </div>
        </div>
    )
}

export default Navbar