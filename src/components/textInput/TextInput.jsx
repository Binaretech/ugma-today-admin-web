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
function TextInput(props) {

  const [validationError, validate] = useValidator(props.rules);
  const errorMessage = useErrorMessage(props.name, [validationError]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.value = props.defaultValue ?? '';
  }, [props.defaultValue]);

  useEffect(() => {
    inputRef.current.checked = props.defaultChecked ?? '';
  }, [props.defaultChecked]);

  function change(e) {
    const { target: { name, value } } = e;

    if (props.onChange) {
      props.onChange(e);
    }

    if (props.setValue) {
      props.setValue(name, value);
    }
    if (!validate(value) && props.setError) props.setError(name, inputRef.current);
  }

  function formatProps() {
    return {
      name: props.name,
      error: errorMessage ? true : false,
      type: props.type,
      variant: props.variant,
      select: props.select,
      label: props.label,
      onChange: change,
      inputRef: inputRef,
      helperText: errorMessage || '',
      defaultValue: props.defaultValue,
      defaultChecked: props.defaultChecked,
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