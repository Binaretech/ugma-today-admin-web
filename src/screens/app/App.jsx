import React from 'react';
import Layout from '../../components/layout/Layout';
import Routes from '../../routes/routes';
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
    <div className="App">
      {
        userId ? (
          <Layout>
            <Routes />
          </Layout>
        ) : <Routes />
      }
      <Snackbar />
    </div>
  );
}

export default App;
