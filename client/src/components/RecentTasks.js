import Cards from './Cards'
import './RecentTasks.css'

function RecentTasks({ tasks }) {
    return (
        <div className="RecentTasks">
            <h2>Recent Tasks</h2>
            <div className="RecentTasks-container">
                {tasks.map(task => (
                    <Cards task={task} />
                ))}
            </div>
        </div>
    )
}

export default RecentTasks;