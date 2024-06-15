import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Weather from './Weather';
import HealthInfoForm from './HealthInfoForm';

import Contact from './components/Contact'; // Correct import path for Contact component

const App = () => {
  return (
    <Router>
      <div>
        <h1 style={{ textAlign: 'center', fontSize: '36px', color: '#FF6347', textTransform: 'uppercase' }}>
          Heat Wave Alert
        </h1>
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/health-info" element={<HealthInfoForm />} />
          
        </Routes>
        <Contact />
      </div>
    </Router>
  );
};

export default App;
