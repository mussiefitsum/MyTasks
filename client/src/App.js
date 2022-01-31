import React, { useState, useEffect, useCallback } from 'react';
import Tasks from './components/Tasks';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [taskArr, setTaskArr] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState('Recent');
  const [category, setCategory] = useState('')

  const allTasks = () => {
    setStatus('Recent');
    setCategory('');
  }

  const todoTasks = () => {
    setStatus('To Do');
    setCategory('');
  }

  const inProgressTasks = () => {
    setStatus('In Progress');
    setCategory('');
  }

  const doneTasks = () => {
    setStatus('Done');
    setCategory('');
  }

  const personalTasks = () => {
    setCategory('Personal');
  }

  const productiveTasks = () => {
    setCategory('Productivity');
  }

  const otherTasks = () => {
    setCategory('Other');
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
      <Sidebar tasks={taskArr} status={status} category={category} todoTasks={todoTasks} inProgressTasks={inProgressTasks} doneTasks={doneTasks} allTasks={allTasks} personalTasks={personalTasks} productiveTasks={productiveTasks} otherTasks={otherTasks} />
      <div className="App-content">
        <Tasks tasks={taskArr} isLoading={isLoading} fetchTasks={fetchTasks} status={status} category={category} searchTasks={searchTasks} />
      </div>
    </div>
  );
}

export default App;
