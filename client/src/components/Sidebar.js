import React, { useState } from 'react';
import filterTasks from '../utilities/filterTasks';
import './Sidebar.css'

function Sidebar({ tasks }) {
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
                    <div className="Sidebar-items-container" onClick={dropdown}>
                        <h4 className="Sidebar-task"><i className={`far fa-check-circle Sidebar-icons${ isToggle ? ' icon-active' : '' }`}></i>Tasks</h4>
                        <i className={`fas fa-${ !isToggle ? 'angle-down' : 'angle-up' }`}></i>
                    </div>
                    <div className={`Sidebar-dropdown${ isToggle ? ' dropdown-active' : '' }`}>
                        <p>To Do <span className="Sidebar-status">{filterTasks(tasks, 'To Do').length}</span></p>
                        <p>In Progress <span className="Sidebar-status">{filterTasks(tasks, 'In Progress').length}</span></p>
                        <p>Done <span className="Sidebar-status">{filterTasks(tasks, 'Done').length}</span></p>
                    </div>
                </div>
                <div className="Sidebar-items">
                    <h4><i className="far fa-folder Sidebar-icons"></i>Categories</h4>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;