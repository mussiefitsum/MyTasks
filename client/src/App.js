import Tasks from './components/Tasks';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="App-content">
        <Tasks />
      </div>
    </div>
  );
}

export default App;
