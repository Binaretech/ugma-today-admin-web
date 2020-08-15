import React from 'react';
import './App.css';
import Routes from '../../routes/routes';
import setLanguage from '../../trans/trans';
import Xhr from '../../Xhr';
import Snackbar from '../../components/Snackbar';

Xhr.initConfigs();

function App() {
  setLanguage('es');

  return (
    <div className="App">
      <Routes />
      <Snackbar />
    </div>
  );
}

export default App;
