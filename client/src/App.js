import React, { useState, useEffect } from 'react';
import Tasks from './components/Tasks';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [taskArr, setTaskArr] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/task', { credentials: 'include' });
      if (!res.ok) {
        throw new Error('Something went wrong when fetching your tasks')
      } else {
        const tasks = await res.json();
        setTaskArr(tasks);
      }
    } catch (err) {
      console.log('Oops')
      console.log(err)
    }
  }

  const startLoading = () => {
    setLoading(true);
  }

  const stopLoading = () => {
    setLoading(false);
  }

  useEffect(() => {
    startLoading();
    fetchTasks();
    stopLoading();
  }, []);
  return (
    <div className="App">
      <Sidebar tasks={taskArr} />
      <div className="App-content">
        <Tasks tasks={taskArr} isLoading={isLoading} fetchTasks={fetchTasks} />
      </div>
    </div>
  );
}

export default App;
