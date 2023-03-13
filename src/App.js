import logo from './logo.svg';
import './App.css';
import Product from './Product';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Product 
        name = "bananas " 
        price = " 1$ " 
        description = " Fresh bananas from Ecuador" 
        />
        
        <Product 
        name = "apples " 
        price = " 5$ " 
        description = " Apples from Armenia" 
        />

        <Product 
        name = "mango " 
        price = " 3$ " 
        description = " Mangos from Philippines" 
        />





      </header>
      
    </div>
  );
}

export default App;
