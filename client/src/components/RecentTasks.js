import Cards from './Cards'
import './RecentTasks.css'

function RecentTasks({ tasks, fetchTasks }) {
    return (
        <div className="RecentTasks">
            <h2>Recent Tasks</h2>
            <div className="RecentTasks-container">
                {tasks.map(task => (
                    <Cards key={task._id} task={task} fetchTasks={fetchTasks} />
                ))}
            </div>
        </div>
    )
}

export default RecentTasks;