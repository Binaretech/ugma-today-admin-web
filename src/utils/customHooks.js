import { useRef, useState, useEffect } from "react";
import * as validationRules from "./validator/validatorRules";
import { trans } from "../trans/trans";
import { useSelector } from "react-redux";
import { organizeMessage } from "./array";
import cleanErrors from "../redux/actions/requestActions";


/**
 * ```useDataManager``` returns a reference to an object of data, a object of errors and a function to 
 * update these values
 * 
 * this is useful to handle and validate inputs without generate re-renders
 * 
 * @typedef {object} Handler
 * @prop {function(string, any)} setValue
 * @prop {function(string, any)} setError
 * 
 * @param {{}} initialData 
 * @returns {[object, Handler]}
 */
export function useDataManager(initialData = {}) {
    const data = useRef(initialData);
    const errors = useRef({});

    function setValue(name, value) {
        data.current[name] = value;
        console.log(data.current);
    }

    function setError(name, value) {
        errors.current[name] = value;
    }

    const manager = {
        setValue,
        setError
    };

    return [data.current, manager];
}

/**
 * ```useValidator``` handle a set of validation rules and handle the errorMessage
 * @param {string[]} rules 
 */
export function useValidator(rules = []) {
    const [validationError, setvalidationError] = useState('');

    function validate(value) {
        for (const rule of rules) {
            if (!validationRules[rule](value)) {
                return setvalidationError(trans(`validation.${rule}`));
            }
        }

        setvalidationError('');
    }

    return [validationError, validate];
}

export function useErrorMessage(name, aditionalMessages = []) {
    const [message, setMessage] = useState('');
    const errors = useSelector((state) => state.requestReducer.errors[name] || []);

    useEffect(() => {
        const messages = [...errors, ...aditionalMessages];
        console.log(messages);
        if (messages.length > 0) {
            setMessage(organizeMessage(messages));
        }

        if (messages.length === 0) setMessage('');

        return () => {
            cleanErrors();
        };
    }, [errors, name, message, aditionalMessages]);

    return message;
}