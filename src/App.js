import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import ToDo from './ToDo-List';
import {Task} from "./ToDo-List";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <ToDo />
        <Task />




      </header>
      
    </div>
  );
}

export default App;
