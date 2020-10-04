/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
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
function Input(props) {

    const [value, setValue] = useState(props.defaultValue);
    const [validationError, validate] = useValidator(props.rules);
    const errorMessage = useErrorMessage(props.name, [validationError]);

    useEffect(() => {
        if (!validate(value, true) && props.setError) props.setError(props.name, focus);
    }, []);

    useEffect(() => {
        if (!validate(value, value === props.defaultValue) && props.setError) props.setError(props.name, focus);
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
            props.setError(name, focus);
        else
            props.setError(name, false);
    }

    function onFocus() {
        if (!validate(value) && props.setError) props.setError(props.name, focus);
    }

    function focus() {
        if (!validate(value) && props.setError) props.setError(props.name, focus);
    }

    function renderSelect() {
        return (
            <FormControl
                variant={props.variant}
                error={!!errorMessage}
            >
                {props.label && <InputLabel >{props.label}</InputLabel>}
                <Select
                    name={props.name}
                    onFocus={onFocus}
                    value={value}
                    label={props.label}
                    onChange={onChange}
                    variant={props.variant}
                    placeholder={props.placeholder}
                    displayEmpty={props.displayEmpty}
                >

                    <MenuItem key="empty" value={null} disabled>
                        {props.placeholder || ""}
                    </MenuItem>
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
            onChange={onChange}
            onFocus={onFocus}
            variant={props.variant}
        />
    );
}


Input.defaultProps = {
    variant: 'outlined',
    type: 'text',
    defaultValue: '',
    options: [],
};

export default Input;