import React, { useState } from 'react';
import filterTasks from '../utilities/filterTasks';
import './Sidebar.css'

function Sidebar({ tasks, todoTasks, inProgressTasks, doneTasks, allTasks, status }) {
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
                        <div className={`Sidebar-dropdown-items${ status === 'Recent' ? ' Sidebar-items-active' : '' }`} onClick={allTasks}>All Tasks <span className="Sidebar-status">{tasks.length}</span></div>
                        <div className={`Sidebar-dropdown-items${ status === 'To Do' ? ' Sidebar-items-active' : '' }`} onClick={todoTasks}>To Do <span className="Sidebar-status">{filterTasks(tasks, 'To Do').length}</span></div>
                        <div className={`Sidebar-dropdown-items${ status === 'In Progress' ? ' Sidebar-items-active' : '' }`} onClick={inProgressTasks}>In Progress <span className="Sidebar-status">{filterTasks(tasks, 'In Progress').length}</span></div>
                        <div className={`Sidebar-dropdown-items${ status === 'Done' ? ' Sidebar-items-active' : '' }`} onClick={doneTasks}>Done <span className="Sidebar-status">{filterTasks(tasks, 'Done').length}</span></div>
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