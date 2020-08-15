import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Loader from '../../components/loader/Loader';

import Xhr from '../../Xhr';
import apiEndpoints from '../../apiEndpoints';
import styles from './Login.module.css';
import { request } from '../../redux/actions/requestActions';
import { useDispatch, useSelector } from 'react-redux';
import { sessionActions } from '../../redux/actions/sessionActions';

function Login() {
  const [username, setUsername] = useState('mari_conazo');
  const [password, setPassword] = useState('secret');
  const loading = useSelector((state) => state.sessionReducer.loading);
  const dispatch = useDispatch();

  let xhr = null;

  const onSubmit = () => {
    if (xhr) xhr.abort();

    xhr = Xhr.post(apiEndpoints.login, {
      data: {
        username,
        password,
      },
    });

    dispatch(request(xhr, sessionActions.LOGIN));
  };

  return (
    <div className={styles.container}>
      {(loading && <Loader />) || (
        <form className={styles.form}>
          <TextField
            label={window.__trans('words.user')}
            name="username"
            variant="outlined"
            value={username}
            onChange={({ target: { value } }) => setUsername(value)}
          />
          <TextField
            label={window.__trans('words.password')}
            name="password"
            type="password"
            variant="outlined"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <Button variant="contained" onClick={() => onSubmit()}>
            {window.__trans('Screens.Login.loginButton')}
          </Button>
        </form>
      )}
    </div>
  );
}

export default Login;
