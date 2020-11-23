import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useXhr} from '../../utils/xhr/hook';
import {useHistory} from 'react-router-dom';
import apiEndpoints from '../../apiEndpoints';
import {setLogin} from '../../redux/actions/sessionActions';
import paths from '../../routes/paths';
import {setErrors} from '../../redux/actions/requestActions';
import {snackbarMessage} from '../../redux/actions/snackbarActions';
import {trans} from '../../trans/trans';

export function useLogin(manager) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const [send] = useXhr({
    url: apiEndpoints.login,
    method: 'POST',
    showErrorSnackbar: true,
  });
  const isLogged = useSelector((state) => state.sessionReducer?.id);

  useEffect(() => {
    if (isLogged) history.goBack();
  }, [history, isLogged]);

  function onSubmit() {
    setLoading(true);
    send({
      body: {
        ...manager.getData(),
      },
    })
      .then((response) => {
        setLoading(false);
        dispatch(setLogin(response?.data));
        history.push(paths.home);
      })
      .catch((response) => {
        setLoading(false);
        dispatch(setErrors(response));
        dispatch(
          snackbarMessage(
            response?.message || trans('Components.snackbar.errorMessage'),
          ),
        );
      });
  }

  return [loading, onSubmit];
}
