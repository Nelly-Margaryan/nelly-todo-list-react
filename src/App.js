import logo from './logo.svg';
import './App.css';
import Welcome from "./Welcome";
import Task from "./Task";
import Product from './Product';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Welcome />

        <Product />
      </header>
      <Task />
      
    </div>
  );
}

export default App;
