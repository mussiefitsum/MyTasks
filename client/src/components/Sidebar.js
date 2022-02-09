import React, { useState, useEffect, useRef } from 'react';
import filterTasks from '../utilities/filterTasks';
import categorizeTasks from '../utilities/categorizeTasks';
import baseUrl from '../utilities/baseUrl';
import './Sidebar.css'

function Sidebar({ tasks, hideSidebar, sidebar, todoTasks, inProgressTasks, doneTasks, allTasks, status, category, personalTasks, productiveTasks, otherTasks }) {
    const [statusToggle, setStatusToggle] = useState(false);
    const [categoryToggle, setCategoryToggle] = useState(false);
    const side = useRef(null);

    useEffect(() => {
        const handleClick = e => {
            if (side.current.contains(e.target)) {
                return;
            }
            hideSidebar();
        };
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        }
    }, [hideSidebar]);
    const statusDropdown = () => {
        setStatusToggle(!statusToggle);
    }
    const categoryDropdown = () => {
        setCategoryToggle(!categoryToggle);
    }
    return (
        <div className={`Sidebar${ sidebar ? ' Sidebar-show' : '' }`} ref={side}>
            <div className="Sidebar-brand">
                <img src="https://res.cloudinary.com/dfuxr1p10/image/upload/v1642360776/MyTasks/tasks_rxewg9.png" alt="" />
                <h1>MyTasks</h1>
            </div>
            <div className="Sidebar-menu">
                <div className={`Sidebar-items${ statusToggle ? ' items-active' : '' }`}>
                    <div className="Sidebar-items-container" onClick={statusDropdown}>
                        <h4 className="Sidebar-task"><i className={`far fa-check-circle Sidebar-icons${ statusToggle ? ' icon-active' : '' }`}></i>Tasks</h4>
                        <i className={`fas fa-${ !statusToggle ? 'angle-down' : 'angle-up' }`}></i>
                    </div>
                    <div className={`Sidebar-dropdown${ statusToggle ? ' dropdown-active' : '' }`}>
                        <div className={`Sidebar-dropdown-items${ status === 'Recent' ? ' Sidebar-items-active' : '' }`} onClick={allTasks}>All Tasks <span className="Sidebar-status">{tasks.length}</span></div>
                        <div className={`Sidebar-dropdown-items${ status === 'To Do' ? ' Sidebar-items-active' : '' }`} onClick={todoTasks}>To Do <span className="Sidebar-status">{filterTasks(tasks, 'To Do').length}</span></div>
                        <div className={`Sidebar-dropdown-items${ status === 'In Progress' ? ' Sidebar-items-active' : '' }`} onClick={inProgressTasks}>In Progress <span className="Sidebar-status">{filterTasks(tasks, 'In Progress').length}</span></div>
                        <div className={`Sidebar-dropdown-items${ status === 'Done' ? ' Sidebar-items-active' : '' }`} onClick={doneTasks}>Done <span className="Sidebar-status">{filterTasks(tasks, 'Done').length}</span></div>
                    </div>
                </div>
                <div className={`Sidebar-items${ categoryToggle ? ' items-active' : '' }`}>
                    <div className="Sidebar-items-container" onClick={categoryDropdown}>
                        <h4><i className={`far fa-folder Sidebar-icons${ categoryToggle ? ' icon-active' : '' }`}></i>Categories</h4>
                        <i className={`fas fa-${ !categoryToggle ? 'angle-down' : 'angle-up' }`}></i>
                    </div>
                    <div className={`Sidebar-dropdown${ categoryToggle ? ' dropdown-active' : '' }`}>
                        <div className={`Sidebar-dropdown-items${ category === 'Personal' ? ' Sidebar-items-active' : '' }`} onClick={personalTasks}>Personal <span className="Sidebar-status">{categorizeTasks(tasks, 'Personal').length}</span></div>
                        <div className={`Sidebar-dropdown-items${ category === 'Productivity' ? ' Sidebar-items-active' : '' }`} onClick={productiveTasks}>Productive <span className="Sidebar-status">{categorizeTasks(tasks, 'Productivity').length}</span></div>
                        <div className={`Sidebar-dropdown-items${ category === 'Other' ? ' Sidebar-items-active' : '' }`} onClick={otherTasks}>Other <span className="Sidebar-status">{categorizeTasks(tasks, 'Other').length}</span></div>
                    </div>
                </div>
                <div className="Sidebar-items Sidebar-logout">
                    <a href={`${ baseUrl }/logout`}>Logout</a>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;