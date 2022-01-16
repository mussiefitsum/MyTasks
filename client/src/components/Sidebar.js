import React, { useState } from 'react';
import './Sidebar.css'

function Sidebar() {
    const [isToggle, setToggle] = useState(false);
    const dropdown = () => {
        setToggle(!isToggle);
    }
    return (
        <div className="Sidebar">
            <div className="Sidebar-brand">
                <img src="https://res.cloudinary.com/dfuxr1p10/image/upload/v1642360776/MyTasks/tasks_rxewg9.png" alt="" />
                <h1>MyTasks</h1>
            </div>
            <div className="Sidebar-menu">
                <div className={`Sidebar-items${ isToggle ? ' items-active' : '' }`}>
                    <h3 className="Sidebar-task" onClick={dropdown}><i className={`far fa-check-circle Sidebar-icons${ isToggle ? ' icon-active' : '' }`}></i>Tasks</h3>
                    <div className={`Sidebar-dropdown${ isToggle ? ' dropdown-active' : '' }`}>
                        <p>To Do</p>
                        <p>In Progress</p>
                        <p>Done</p>
                    </div>
                </div>
                <div className="Sidebar-items">
                    <h3><i class="far fa-folder Sidebar-icons"></i>Categories</h3>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;