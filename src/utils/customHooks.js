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
 * @prop {function(string) => any} getValue
 * @prop {function() => any} getData
 * 
 * @param {{}} initialData 
 * @returns {Handler}
 */
export function useDataManager(initialData = {}) {
    const data = useRef(initialData);
    const errors = useRef({});

    function setValue(name, value) {
        data.current[name] = value;
    }

    function setError(name, value) {
        errors.current[name] = value;
    }

    function getValue(name, defaultValue = null) {
        if (!data.current[name]) return defaultValue;
        return data.current[name];
    }

    function getData() {
        return data.current;
    }

    const manager = {
        setValue,
        setError,
        getValue,
        getData,
    };

    return manager;
}

/**
 * ```useValidator``` handle a set of validation rules and handle the errorMessage
 * @typedef {object} CustomRule
 * @prop {string} message
 * @prop {function(any) => bool} validation
 * 
 * @param {Array<string|CustomRule>} rules 
 */
export function useValidator(rules = []) {
    const [validationError, setvalidationError] = useState('');

    function validate(value) {
        for (const rule of rules) {
            if (typeof rule === 'object' && rule.validation && !rule.validation(value)) {
                setvalidationError(rule.message);
                return false;
            }

            const validationName = rule.split(':')[0];
            const params = rule.split(':')[1]?.split(',') || [];

            if (validationRules[validationName] && !validationRules[validationName](value, rules, ...params)) {
                let message = trans(`validation.${validationName}`, formatParams(params));

                if (rules.includes('number')) message = message.replace(/caracteres/, '');

                setvalidationError(message);
                return false;
            }
        }

        function formatParams(params) {
            let transParams = {};

            params.forEach((param, index) => {
                transParams = {
                    ...transParams,
                    [index]: param,
                };
            });

            return transParams;
        }

        setvalidationError('');
        return true;
    }

    return [validationError, validate];
}

export function useErrorMessage(name, aditionalMessages = []) {
    const [message, setMessage] = useState('');
    const errors = useSelector((state) => state.requestReducer.errors[name] || []);

    useEffect(() => {
        const messages = [...errors, ...aditionalMessages];

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