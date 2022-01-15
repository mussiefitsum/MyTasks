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
                <input type="text" className="Navbar-search" onChange={handleChange} value={taskSearch} placeholder="Search for tasks" />
            </div>
        </div>
    )
}

export default Navbar