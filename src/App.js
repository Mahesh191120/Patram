import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./Components/Navbar"
import React from 'react';
import EmailRemainder from './Action/EmailRemainder';
 import Print from './Components/Print'

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Navbar/>     
      </React.Fragment>
      {/* <BrowserRouter>
        <Routes>
        <Route path="/email" element={<EmailRemainder />} />
        </Routes>
      </BrowserRouter> */}
      {/* <EmailRemainder /> */}
      {/* <Print /> */}
    </div>
  );
}

export default App;
