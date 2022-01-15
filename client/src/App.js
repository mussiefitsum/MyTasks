import './App.css';
import Tasks from './components/Tasks';

function App() {
  return (
    <div className="App">
      <div className="App-sidebar">
        <h1>MyTasks</h1>
        <p>Tasks</p>
      </div>
      <div className="App-content">
        <Tasks />
      </div>
    </div>
  );
}

export default App;
