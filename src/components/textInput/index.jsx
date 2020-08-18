import React, { useEffect, useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';

export default function TextInput({
  name,
  label,
  value,
  variant,
  onChange,
  type = 'text',
}) {
  const inputRef = useRef(null);
  const [message, setMessage] = useState('');
  const errors = useSelector((state) => state.requestReducer.errors);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorMessages = errors[name];

      setMessage(organizeMessage(errorMessages));
    }

    if (Object.keys(errors).length === 0) setMessage('');
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
  if (Array.isArray(errorMessages) && errorMessages.length > 0)
    errorMessages.map((error) => (completeMessage = error + '\n'));
  return completeMessage;
}
