import React from 'react';
import Button from '@material-ui/core/Button';
import Loader from '../../components/loader/Loader';
import TextInput from '../../components/textInput';

import Xhr from '../../Xhr';
import apiEndpoints from '../../apiEndpoints';
import styles from './Login.module.css';
import { request } from '../../redux/actions/requestActions';
import { useDispatch, useSelector } from 'react-redux';
import { sessionActions } from '../../redux/actions/sessionActions';
import { trans } from '../../trans/trans';

function Login() {
  const inputValues = {
    username: '',
    password: '',
  };

  const loading = useSelector((state) => state.sessionReducer.loading);
  const dispatch = useDispatch();

  let xhr = null;

  const onSubmit = () => {
    if (xhr) xhr.abort();

    xhr = Xhr.post(apiEndpoints.login, {
      data: {
        ...inputValues,
      },
    });

    dispatch(request(xhr, sessionActions.LOGIN));
  };

  const onChange = ({ target: { name, value } }) => {
    inputValues[name] = value;
  };

  return (
    <div className={styles.container}>
      {(loading && <Loader />) || (
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
