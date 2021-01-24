import React from 'react';
import Routes from '../../routes/routes';
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary';
import Snackbar from '../../components/snackbar/Snackbar';
import setLanguage from '../../trans/trans';
import './App.css';

function App() {
  setLanguage('es');

  return (
    <div className="App">
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
      <Snackbar />
    </div>
  );
}

export default App;
