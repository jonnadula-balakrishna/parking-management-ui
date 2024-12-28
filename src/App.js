import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ParkVehicle from './components/ParkVehicle';
import ParkedVehiclesData from './components/ParkedVehiclesData';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DisplayAllVehicleList from './components/DisplayAllVehicleList';


function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Navbar />}>
            <Route path="/" exact element={<Dashboard />} />
            <Route path='/parkVehicle' element={<ParkVehicle />} />
            <Route path='/parkVehiclesList' element={<ParkedVehiclesData />} />
            <Route path='/displayAllVehicleList' element={<DisplayAllVehicleList />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>


  );
}

export default App;
