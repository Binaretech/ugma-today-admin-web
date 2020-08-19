import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { useSelector, useDispatch } from 'react-redux';
import { snackbarClose } from '../../redux/actions/snackbarActions';
import { SnackbarContent } from '@material-ui/core';

export default function PositionedSnackbar() {
  const position = {
    vertical: 'bottom',
    horizontal: 'center',
  };

  const open = useSelector(({ snackbarReducer }) => snackbarReducer.open);
  const message = useSelector((state) => state.snackbarReducer.message);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(snackbarClose());
  };

  return (
    <Snackbar
      anchorOrigin={position}
      open={open}
      onClose={handleClose}
      autoHideDuration={5000}
    >
      <SnackbarContent message={message} />
    </Snackbar>
  );
}
