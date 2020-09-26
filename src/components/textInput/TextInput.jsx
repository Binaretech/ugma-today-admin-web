import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useValidator, useErrorMessage } from '../../utils/customHooks';

/**
 * @typedef {object} Props
 * @prop {string} name
 * @prop {string?} label
 * @prop {string} value
 * @prop {'outlined'|'standard'|'filled'} variant
 * @prop {function(event) => void} onChange
 * @prop {function(string, string) => void} setValue
 * @prop {function(string, string) => void} setError
 * @prop {string} type
 * @prop {string[]} rules
 * 
 * @param {Props} props 
 */
export default function TextInput({ name, label = '', value, variant = 'outlined', onChange, setError, setValue, type = 'text', rules }) {

  const [validationError, validate] = useValidator(rules);
  const errorMessage = useErrorMessage(name, [validationError]);

  function change(e) {
    const { target: { name, value } } = e;

    if (onChange) {
      onchange(e);
    }

    if (setValue) {
      setValue(name, value);
    }

    validate(value);
  }

  return (
    <TextField
      error={errorMessage ? true : false}
      label={label}
      name={name}
      variant={variant}
      defaultValue={value}
      type={type || 'text'}
      onChange={change}
      // inputRef={inputRef}
      helperText={errorMessage || ''}
    />
  );
}

