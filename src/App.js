import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import NavBar from './Components/NavBar/NavBar';
import { routes } from './routes';
import Loader from './Components/Loader/Loader';
import './App.css';




function App() {
  const isLoading = useSelector((store)=> store.loader.isLoading);
  return (
      <BrowserRouter>
        <main>
          <NavBar />
          <Routes>
            {
              routes.map((page) =>
                <Route
                  key={page.path}
                  path={page.path}
                  element={page.element}
                />
              )
            }
          </Routes>
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          {isLoading && <Loader />
          }
        </main>
      </BrowserRouter>
  );
}

export default App;
