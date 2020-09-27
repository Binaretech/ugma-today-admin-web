import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Loader from '../../components/loader/Loader';
import TextInput from '../../components/textInput/TextInput';

import apiEndpoints from '../../apiEndpoints';
import { useDispatch } from 'react-redux';
import { trans } from '../../trans/trans';

import styles from './Login.module.css';
import { useXhr } from '../../utils/xhr/hook';
import { setLogin } from '../../redux/actions/sessionActions';
import { useHistory } from 'react-router-dom';
import paths from '../../routes/paths';
import { setErrors } from '../../redux/actions/requestActions';
import { snackbarMessage } from '../../redux/actions/snackbarActions';

function Login() {
  const inputValues = {
    username: 'mari_conazo',
    password: 'secret',
  };

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [send,] = useXhr({ url: apiEndpoints.login, method: "POST", showErrorSnackbar: true });
  const history = useHistory();

  const onSubmit = () => {
    setLoading(true);

    send({
      body: {
        ...inputValues,
      }
    }).then((response) => {
      setLoading(false);
      dispatch(setLogin(response));
      history.push(paths.home);
    }).catch((response) => {
      setLoading(false);
      dispatch(setErrors(response));
      dispatch(snackbarMessage(
        response?.data?.message ||
        trans('Components.snackbar.errorMessage')
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

export default Login;
