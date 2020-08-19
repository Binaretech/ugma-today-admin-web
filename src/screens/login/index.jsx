import React from 'react';
import Button from '@material-ui/core/Button';
import Loader from '../../components/loader/Loader';
import TextInput from '../../components/textInput/TextInput';

import Xhr from '../../Xhr';
import apiEndpoints from '../../apiEndpoints';
import { request } from '../../redux/actions/requestActions';
import { useDispatch, useSelector } from 'react-redux';
import { sessionActions, loading } from '../../redux/actions/sessionActions';
import { trans } from '../../trans/trans';

import styles from './Login.module.css';

function Login() {
  const inputValues = {
    username: 'mari_conazo',
    password: 'secret',
  };

  const loader = useSelector((state) => state.sessionReducer.loading);
  const dispatch = useDispatch();

  let xhr = null;

  const onSubmit = () => {
    if (xhr) xhr.abort();

    xhr = Xhr.post(apiEndpoints.login, {
      data: {
        ...inputValues,
      },
    });

    dispatch(loading());
    dispatch(
      request(xhr, sessionActions.LOGIN, sessionActions.ERROR_LOGIN, {
        showSnackbarError: true,
      })
    );
  };

  const onChange = ({ target: { name, value } }) => {
    inputValues[name] = value;
  };

  return (
    <div className={styles.container}>
      {(loader && <Loader fullscreen />) || (
        <form className={styles.form}>
          <TextInput
            label={trans('words.user')}
            name="username"
            variant="outlined"
            value={inputValues.username}
            onChange={onChange}
          />
          <TextInput
            label={trans('words.password')}
            name="password"
            type="password"
            variant="outlined"
            value={inputValues.password}
            onChange={onChange}
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
