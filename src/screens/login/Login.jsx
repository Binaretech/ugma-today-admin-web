import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Loader from '../../components/loader/Loader';
import TextInput from '../../components/textInput/TextInput';

import Xhr from '../../Xhr';
import apiEndpoints from '../../apiEndpoints';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/actions/sessionActions';
import { trans } from '../../trans/trans';
import { snackbarMessage } from '../../redux/actions/snackbarActions';

import styles from './Login.module.css';
import { withRouter } from 'react-router-dom';

function Login({ history: { push } }) {

  const inputValues = process.env.REACT_APP_ENV === 'local' ? {
    username: 'mari_conazo',
    password: 'secret',
  } : {};

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  let xhr = null;

  const onSubmit = () => {
    if (xhr) xhr.abort();

    xhr = Xhr.post(apiEndpoints.login, {
      data: {
        ...inputValues,
      },
    });

    setLoading(true);

    xhr.send().then((response) => {
      setLoading(false);
      dispatch(setUserData(response?.data));
      push('/');
    }).catch((response) => {
      setLoading(false);

      dispatch(snackbarMessage(
        response?.data?.message ||
        trans('Components.snackbar.successMessage')
      ));
    });
  };

  const onChange = ({ target: { name, value } }) => {
    inputValues[name] = value;
  };

  return (
    <div className={styles.container}>
      {(loading && <Loader fullscreen />) || (
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

export default withRouter(Login);
