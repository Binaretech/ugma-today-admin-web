import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { useSelector, useDispatch } from 'react-redux';
import { snackbarClose } from '../../redux/actions/snackbarActions';

export default function PositionedSnackbar() {
  const [position] = useState({
    vertical: 'bottom',
    horizontal: 'center',
  });
  // const [open, setOpen] = useState(false);
  const message = useSelector((state) => state.snackbarReducer.message);
  const open = useSelector(({ snackbarReducer }) => snackbarReducer.open);
  const dispatch = useDispatch();

  // const handleClick = (newState) => () => {
  //   setOpen({ open: true });
  // };

  const handleClose = () => {
    dispatch(snackbarClose());
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={position}
        open={open}
        onClose={handleClose}
        message={message}
        key={position.vertical + position.horizontal}
      />
    </div>
  );
}
