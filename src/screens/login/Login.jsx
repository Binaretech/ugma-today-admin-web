import React from 'react';
import Button from '@material-ui/core/Button';
import Loader from '../../components/loader/Loader';
import Input from '../../components/input/Input';

import { trans } from '../../trans/trans';

import styles from './Login.module.css';
import { useDataManager } from '../../utils/customHooks';
import { useLogin } from './functions';

function Login() {
  const inputValues =
    process.env.REACT_APP_ENV === 'local'
      ? {
        username: 'admin',
        password: 'secret',
      }
      : {};

  const manager = useDataManager(inputValues);
  const [loading, onSubmit] = useLogin(manager);

  return (
    <div className={styles.container}>
      {(loading && <Loader fullscreen />) || (
        <form className={styles.form}>
          <Input
            label={trans('words.user')}
            name="username"
            variant="outlined"
            value={inputValues.username}
            setValue={manager.setValue}
            setError={manager.setError}
          />
          <Input
            label={trans('words.password')}
            name="password"
            type="password"
            variant="outlined"
            value={inputValues.password}
            setValue={manager.setValue}
            setError={manager.setError}
          />
          <Button variant="contained" onClick={onSubmit}>
            {trans('Screens.Login.loginButton')}
          </Button>
        </form>
      )}
    </div>
  );
}

export default Login;
