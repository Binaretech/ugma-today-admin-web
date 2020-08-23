import React, { useEffect, useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
import cleanErrors from '../../redux/actions/requestActions';

export default function TextInput({
  name,
  label = '',
  value,
  variant = 'outlined',
  onChange,
  type = 'text',
}) {
  const inputRef = useRef(null);
  const [message, setMessage] = useState('');
  const errors = useSelector(
    (state) => state.requestReducer.errors[name] || []
  );

  useEffect(() => {
    if (errors.length > 0) {
      setMessage(organizeMessage(errors));
    }

    if (errors.length === 0) setMessage('');

    return () => {
      cleanErrors();
    };
  }, [errors, name, message]);

  return (
    <TextField
      error={message ? true : false}
      label={label}
      name={name}
      variant={variant}
      defaultValue={value}
      type={type || 'text'}
      onChange={onChange}
      inputRef={inputRef}
      helperText={message || ''}
    />
  );
}

function organizeMessage(errorMessages) {
  let completeMessage = '';
  errorMessages.map(
    (error) => (completeMessage = completeMessage + error + '\n')
  );
  return completeMessage;
}
