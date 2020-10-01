/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useValidator, useErrorMessage } from '../../utils/customHooks';
import { MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import { useState } from 'react';

/**
 * @typedef {object} CustomRule
 * @prop {string} message
 * @prop {function(any) => bool} validation
 *
 * @typedef {object} Props
 * @prop {string} name
 * @prop {string?} label
 * @prop {string} defaultValue
 * @prop {string} placeholder
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

    const [value, setValue] = useState(props.defaultValue);
    const [validationError, validate] = useValidator(props.rules);
    const errorMessage = useErrorMessage(props.name, [validationError]);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!validate(value, value === props.defaultValue) && props.setError) props.setError(props.name, inputRef.current);
    }, [value]);

    useEffect(() => {
        setValue(props.defaultValue);
    }, [props.defaultValue]);

    function onChange(e) {
        const { target: { name, value } } = e;

        setValue(value);

        if (props.onChange) {
            props.onChange(e);
        }

        if (props.setValue) {
            props.setValue(name, value);
        }

        if (!validate(value) && props.setError)
            props.setError(name, inputRef.current);
        else
            props.setError(name, false);
    }

    function onFocus() {
        if (!validate(inputRef.current.value) && props.setError) props.setError(props.name, inputRef.current);
    }

    function renderSelect() {
        return (
            <FormControl
                variant={props.variant}
                error={!!errorMessage}
            >
                {props.label && <InputLabel>{props.label}</InputLabel>}
                <Select
                    name={props.name}
                    label={props.label}
                    placeholder={props.placeholder}
                    inputRef={inputRef}
                    onChange={onChange}
                    onFocus={onFocus}
                    value={value}
                    displayEmpty={props.displayEmpty}
                >

                    {
                        props.options.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))
                    }
                </Select>
                {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
            </FormControl>
        );
    }

    return props.select ? renderSelect() : (
        <TextField
            name={props.name}
            value={value}
            error={!!errorMessage}
            type={props.type}
            label={props.label}
            helperText={errorMessage}
            inputRef={inputRef}
            onChange={onChange}
            onFocus={onFocus}
            variant={props.variant}
        />
    );
}


TextInput.defaultProps = {
    variant: 'outlined',
    type: 'text',
    defaultValue: '',
    options: [],
};

export default TextInput;