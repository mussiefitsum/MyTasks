import React, { useEffect, useState, useRef } from 'react';
import putStatus from '../utilities/putStatus';
import './Cards.css';

function Cards({ task, fetchTasks }) {
    const [isCardMenu, setCardMenu] = useState(false);
    const node = useRef();
    const handleClick = e => {
        if (node.current.contains(e.target)) {
            return;
        }
        setCardMenu(false);
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        }
    }, [])
    const taskStatus = (status) => {
        if (status === 'To Do') {
            return <span className="Cards-status" style={{ color: '#6c757d' }}><i className="fas fa-clipboard-list"></i>  {status.toUpperCase()}</span>
        } else if (status === 'In Progress') {
            return <span className="Cards-status" style={{ color: '#e4ae0a' }}><i className="fas fa-hard-hat"></i>  {status.toUpperCase()}</span>
        } else {
            return <span className="Cards-status" style={{ color: '#28a745' }}><i className="fas fa-check-circle"></i>  {status.toUpperCase()}</span>
        }
    }
    const inProgressStatus = () => {
        putStatus(task._id, 'In Progress');
        setCardMenu(!isCardMenu);
        fetchTasks();
    }
    const toDoStatus = () => {
        putStatus(task._id, 'To Do');
        setCardMenu(!isCardMenu);
        fetchTasks();
    }
    const doneStatus = () => {
        putStatus(task._id, 'Done');
        setCardMenu(!isCardMenu);
        fetchTasks();
    }
    const statusDropdown = (status) => {
        if (status === 'To Do') {
            return (
                <div className={`Cards-dropdown ${ isCardMenu ? 'Cards-active' : '' }`} ref={node}>
                    <strong>Change Status</strong>
                    <div className="Cards-dropdown-item" onClick={inProgressStatus}>In Progress</div>
                    <div className="Cards-dropdown-item" onClick={doneStatus}>Done</div>
                </div>
            )
        } else if (status === 'In Progress') {
            return (
                <div className={`Cards-dropdown ${ isCardMenu ? 'Cards-active' : '' }`} ref={node}>
                    <strong>Change Status</strong>
                    <div className="Cards-dropdown-item" onClick={toDoStatus}>To Do</div>
                    <div className="Cards-dropdown-item" onClick={doneStatus}>Done</div>
                </div>
            )
        } else {
            return (
                <div className={`Cards-dropdown ${ isCardMenu ? 'Cards-active' : '' }`} ref={node}>
                    <strong>Change Status</strong>
                    <div className="Cards-dropdown-item" onClick={toDoStatus}>To Do</div>
                    <div className="Cards-dropdown-item" onClick={inProgressStatus}>In Progress</div>
                </div>
            )
        }
    }
    const toggleCardMenu = () => {
        setCardMenu(!isCardMenu);
    }
    return (
        <div className="Cards">
            <div className="Cards-top">
                {taskStatus(task.status)}
                <i className="fas fa-ellipsis-v" onClick={toggleCardMenu}></i>
            </div>
            {statusDropdown(task.status)}
            <h3 className="Cards-task">{task.name}</h3>
            <h5 className="Cards-category">Category: {task.category !== '' ? task.category : 'Uncategorized'}</h5>
            {task.description !== '' ? <p className="Cards-description">{task.description}</p> : ''}
        </div>
    )
}

export default Cards;