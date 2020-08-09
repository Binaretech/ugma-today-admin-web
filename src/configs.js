const appEnv = process.env.REACT_APP_ENV;

function appBaseUrl() {
  switch (appEnv) {
    case 'production':
      return 'http://url/api/';

    default:
      return 'http://localhost/ugma-today/api/';
  }
}

export default appBaseUrl;
