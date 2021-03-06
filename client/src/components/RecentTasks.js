import Cards from './Cards';
import Loader from './Loader';
import './RecentTasks.css';

function RecentTasks({ tasks, fetchTasks, isLoading, status, category }) {
    if (!isLoading) {
        return (
            <div className="RecentTasks">
                <h2>{category || status} Tasks <span className="RecentTasks-number">({tasks.length})</span></h2>
                <div className="RecentTasks-container">
                    {tasks.map(task => (
                        <Cards key={task._id} task={task} fetchTasks={fetchTasks} />
                    ))}
                </div>
            </div>
        )
    } else {
        return <Loader message="One Moment" />
    }
}

export default RecentTasks;