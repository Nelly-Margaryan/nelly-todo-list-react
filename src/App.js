import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ToDo from './components/todo/ToDo-List';

function App() {
  return (
    <main>
      <ToDo />
    </main>
  );
}

export default App;
