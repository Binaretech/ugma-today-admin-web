import React from 'react';
import './App.css';
import Routes from '../../routes/routes';
import setLanguage from '../../trans/trans';

function App() {
  setLanguage('es');

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
