import React, { useRef, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useValidator, useErrorMessage } from '../../utils/customHooks';
import { MenuItem } from '@material-ui/core';

/**
 * @typedef {object} CustomRule
 * @prop {string} message
 * @prop {function(any) => bool} validation
 *
 * @typedef {object} Props
 * @prop {string} name
 * @prop {string?} label
 * @prop {string} value
 * @prop {'outlined'|'standard'|'filled'} variant
 * @prop {function(event) => void} onChange
 * @prop {function(string, string) => void} setValue
 * @prop {function(string, string) => void} setError
 * @prop {boolean} select
 * @prop {[{value, label}]} options
 * @prop {string} type
 * @prop {Array<string|CustomRule>} rules
 * 
 * @param {Props} props 
 */
function TextInput({ defaultValue, name, setError, defaultChecked, ...props }) {

  const [validationError, validate] = useValidator(props.rules);
  const errorMessage = useErrorMessage(name, [validationError]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!validate(inputRef.current.value, true) && setError) setError(name, inputRef.current);
  }, [validate, name, setError]);

  useEffect(() => {
    inputRef.current.value = defaultValue ?? '';
    if (!validate(inputRef.current.value, true) && setError) setError(name, inputRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, name, setError]);

  useEffect(() => {
    inputRef.current.checked = defaultChecked ?? '';
  }, [defaultChecked]);

  function change(e) {
    const { target: { name, value } } = e;

    if (props.onChange) {
      props.onChange(e);
    }

    if (props.setValue) {
      props.setValue(name, value);
    }

    if (!validate(value) && setError)
      setError(name, inputRef.current);
    else
      setError(name, false);
  }

  function onFocus() {
    if (!validate(inputRef.current.value) && setError) setError(name, inputRef.current);
  }

  function formatProps() {
    return {
      name: name,
      error: errorMessage ? true : false,
      type: props.type,
      variant: props.variant,
      select: props.select,
      label: props.label,
      onChange: change,
      inputRef: inputRef,
      helperText: errorMessage || '',
      defaultValue: defaultValue,
      defaultChecked: defaultChecked,
      onFocus,
    };
  }


  function renderSelect() {
    return (
      <TextField {...formatProps()}>
        {
          props.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))
        }
      </TextField>
    );
  }

  return props.select ? renderSelect() : (
    <TextField {...formatProps()} />
  );
}


TextInput.defaultProps = {
  variant: 'outlined',
  type: 'text',
  options: [],
};

export default TextInput;