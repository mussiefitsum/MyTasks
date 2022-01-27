import Cards from './Cards';
import Loader from './Loader';
import './RecentTasks.css';

function RecentTasks({ tasks, fetchTasks, startLoading, stopLoading, isLoading }) {
    if (!isLoading) {
        return (
            <div className="RecentTasks">
                <h2>Recent Tasks</h2>
                <div className="RecentTasks-container">
                    {tasks.map(task => (
                        <Cards key={task._id} task={task} fetchTasks={fetchTasks} startLoading={startLoading} stopLoading={stopLoading} />
                    ))}
                </div>
            </div>
        )
    } else {
        return <Loader message="Loading Tasks" />
    }
}

export default RecentTasks;