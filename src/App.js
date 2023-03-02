import logo from './logo.svg';
import './App.css';
import Welcome from "./Welcome";
import Task from "./Task";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Welcome />
      </header>
      <Task />
      
    </div>
  );
}

export default App;
