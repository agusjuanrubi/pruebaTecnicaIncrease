import './App.css';
import {  Route, Routes } from "react-router-dom";
import LandingPage from './Component/LandingPage/LandingPage';
import Home from './Component/Home/Home'
import Cliente from './Component/Cliente/Cliente'

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<LandingPage /> } />
           <Route path="/home" element={<Home /> } />
           <Route path="/:id" element={<Cliente /> } />
          
          
        </Routes>
    </div>
  );
}

export default App;
