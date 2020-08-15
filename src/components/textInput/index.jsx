import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function TextInput(props) {
  const inputRef = React.createRef();

  const onChange = (event) => {
    props.onChange(event);
  };

  return (
    <TextField
      label={props.label}
      name={props.name}
      variant={props.variant}
      defaultValue={props.value}
      type={props.type || 'text'}
      onChange={onChange}
      inputRef={inputRef}
    />
  );
}
