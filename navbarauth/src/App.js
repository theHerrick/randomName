import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import NameSelector from './NameSelector'
import EditNames from './EditNames';

const App = () => {
  
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<NameSelector />} />
          <Route path="/editnames" element={<EditNames />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
