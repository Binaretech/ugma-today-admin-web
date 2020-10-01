import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Loader from '../../components/loader/Loader';
import Input from '../../components/input/Input';

import apiEndpoints from '../../apiEndpoints';
import { useDispatch } from 'react-redux';
import { trans } from '../../trans/trans';
import { snackbarMessage } from '../../redux/actions/snackbarActions';

import styles from './Login.module.css';
import { useXhr } from '../../utils/xhr/hook';
import { setLogin } from '../../redux/actions/sessionActions';
import { useHistory } from 'react-router-dom';
import paths from '../../routes/paths';
import { setErrors } from '../../redux/actions/requestActions';
import { useDataManager } from '../../utils/customHooks';

function Login() {

  const inputValues = process.env.REACT_APP_ENV === 'local' ? {
    username: 'mari_conazo',
    password: 'secret',
  } : {};

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [send,] = useXhr({ url: apiEndpoints.login, method: "POST", showErrorSnackbar: true });
  const history = useHistory();
  const manager = useDataManager(inputValues);

  const onSubmit = () => {
    setLoading(true);

    send({
      body: {
        ...manager.getData(),
      }
    }).then((response) => {
      setLoading(false);
      dispatch(setLogin(response?.data));
      history.push(paths.home);
    }).catch((response) => {
      setLoading(false);
      dispatch(setErrors(response));
      dispatch(snackbarMessage(
        response?.message ||
        trans('Components.snackbar.errorMessage')
      ));
    });
  };

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
