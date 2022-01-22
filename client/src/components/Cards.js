import './Cards.css'

function Cards({ task }) {
    const taskStatus = (status) => {
        if (status === 'To Do') {
            return <span className="Cards-status" style={{ color: '#6c757d' }}><i className="fas fa-clipboard-list"></i> {status.toUpperCase()}</span>
        } else if (status === 'In Progress') {
            return <span className="Cards-status" style={{ color: '#e4ae0a' }}><i className="fas fa-hard-hat"></i> {status.toUpperCase()}</span>
        } else {
            return <span className="Cards-status" style={{ color: '#28a745' }}><i className="fas fa-check-circle"></i> {status.toUpperCase()}</span>
        }
    }
    return (
        <div className="Cards">
            <div className="Cards-top">
                {taskStatus(task.status)}
                <i className="fas fa-ellipsis-v"></i>
            </div>
            {/* <ul className="Cards-dropdown">

            </ul> */}
            <h3 className="Cards-task">{task.name}</h3>
            <h5 className="Cards-category">Category: {task.category !== '' ? task.category : 'Uncategorized'}</h5>
            {task.description !== '' ? <p className="Cards-description">{task.description}</p> : ''}
        </div>
    )
}

export default Cards;