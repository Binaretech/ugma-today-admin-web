import React from 'react';
import Scaffold from '../../components/scaffold/Scaffold';
import Routes from '../../routes/routes';
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary';
import Snackbar from '../../components/snackbar/Snackbar';
import { useSelector } from 'react-redux';
import setLanguage from '../../trans/trans';
import Xhr from '../../Xhr';
import './App.css';

Xhr.initConfigs();

function App() {
  setLanguage('es');

  const userId = useSelector((state) => state.sessionReduer?.user?.id);

  return (
    <div className="App">;
      <ErrorBoundary>
        {
          userId ?
            <Scaffold>
              <Routes />
            </Scaffold>
            :
            <Routes />
        }
      </ErrorBoundary>
      <Snackbar />
    </div >
  );
}

export default App;
