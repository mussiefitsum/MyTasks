import React, { useState, useEffect, useCallback } from 'react';
import Tasks from './components/Tasks';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [taskArr, setTaskArr] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState('Recent');

  const allTasks = () => {
    setStatus('Recent')
  }

  const todoTasks = () => {
    setStatus('To Do')
  }

  const inProgressTasks = () => {
    setStatus('In Progress');
  }

  const doneTasks = () => {
    setStatus('Done');
  }

  const startLoading = () => {
    setLoading(true);
  }

  const stopLoading = () => {
    setLoading(false);
  }

  const searchTasks = async (query) => {
    try {
      const res = await fetch(`http://localhost:3001/api/task/search?task=${ query }`, { credentials: 'include' });
      if (!res.ok) {
        throw new Error('Something went wrong when fetching your tasks')
      } else {
        const results = await res.json();
        setTaskArr(results);
      }
    } catch (err) {
      console.log('Oops')
      console.log(err)
    }
  }

  const fetchTasks = useCallback(async () => {
    startLoading();
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
    stopLoading();
  }, [])

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  return (
    <div className="App">
      <Sidebar tasks={taskArr} status={status} todoTasks={todoTasks} inProgressTasks={inProgressTasks} doneTasks={doneTasks} allTasks={allTasks} />
      <div className="App-content">
        <Tasks tasks={taskArr} isLoading={isLoading} fetchTasks={fetchTasks} status={status} searchTasks={searchTasks} />
      </div>
    </div>
  );
}

export default App;
