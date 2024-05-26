import React from 'react';
import Weather from './Weather';

const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '36px', color: '#FF6347', textTransform: 'uppercase' }}>
        Heat Wave Alert
      </h1>
      <Weather />
    </div>
  );
};

export default App;
