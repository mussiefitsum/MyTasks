import Navbar from './Navbar';
import RecentTasks from './RecentTasks';
import { Routes, Route } from 'react-router-dom'
import './Tasks.css'

function Tasks() {
    return (
        <div className="Tasks">
            <Navbar />
            <div className="Tasks-container">
                <Routes>
                    <Route path="/" element={<RecentTasks />}>

                    </Route>
                </Routes>
            </div>
        </div>
    )
}

export default Tasks;