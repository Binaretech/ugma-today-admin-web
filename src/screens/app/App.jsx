import React from 'react';
import './App.css';
import Routes from '../../routes/routes';
import setLanguage from '../../trans/trans';
import Xhr from '../../Xhr';
import Snackbar from '../../components/snackbar/Snackbar';
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary';

Xhr.initConfigs();

function App() {
  setLanguage('es');

  return (
    <div className="App">
      <ErrorBoundary>
        <Routes />
        <Snackbar />
      </ErrorBoundary>
    </div>
  );
}

export default App;
