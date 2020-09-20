import React from 'react';
import Layout from '../../components/layout/Layout';
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
            <Layout>
              <Routes />
            </Layout>
            :
            <Routes />
        }
      </ErrorBoundary>
      <Snackbar />
    </div >
  );
}

export default App;
