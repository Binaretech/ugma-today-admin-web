import { useRef, useState, useEffect } from 'react';
import * as validationRules from './validator/validatorRules';
import { trans } from '../trans/trans';
import { useSelector, useDispatch } from 'react-redux';
import { organizeMessage } from './array';
import { cleanError } from '../redux/actions/requestActions';
import { useHistory } from 'react-router-dom';
import { useXhr } from '../utils/xhr/hook';
import apiEndpoints from '../apiEndpoints';
import { setLogout } from '../redux/actions/sessionActions';
import paths from '../routes/paths';
import { snackbarMessage } from '../redux/actions/snackbarActions';

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
 * @prop {function(any) => void} setData
 * @prop {function() => object} getData
 * @prop {function()} cleanData
 * @prop {function()} cleanErrors
 * @prop {function() => bool} hasErrors
 * @prop {function(string) => any} getError
 * @prop {function() => any} getErrors
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

	function cleanData() {
		data.current = {};
	}

	function cleanErrors() {
		errors.current = {};
	}

	function setData(newData) {
		data.current = newData;
	}

	function hasErrors() {
		for (const key in errors.current) {
			if (errors.current[key]) {
				errors.current[key]();
				return true;
			}
		}

		return false;
	}

	function getError(key) {
		return errors.current[key] ? true : false;
	}

	function getErrors() {
		return errors.current;
	}

	const manager = {
		setValue,
		setError,
		getValue,
		getData,
		cleanData,
		cleanErrors,
		hasErrors,
		getError,
		getErrors,
		setData,
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
 * @returns {[string, function(any, boolean) => boolean]}
 */
export function useValidator(rules = []) {
	const [validationError, setvalidationError] = useState('');

	function validate(value, omitMessage = false) {
		for (const rule of rules) {
			if (
				typeof rule === 'object' &&
				rule.validation &&
				!rule.validation(value)
			) {
				setvalidationError(rule.message);
				return false;
			}

			const validationName = rule.split(':')[0];
			const params = rule.split(':')[1]?.split(',') || [];

			if (
				validationRules[validationName] &&
				!validationRules[validationName](value, rules, ...params)
			) {
				let message = trans(
					`validation.${validationName}`,
					formatParams(params)
				);

				if (rules.includes('number'))
					message = message.replace(/caracteres/, '');

				if (!omitMessage) setvalidationError(message);
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
	const errors = useSelector(
		(state) => state.requestReducer.errors[name] || []
	);
	const dispatch = useDispatch();

	useEffect(() => {
		const messages = [...errors, ...aditionalMessages];

		if (messages.length > 0) {
			setMessage(organizeMessage(messages));
		}

		if (messages.length === 0) setMessage('');
	}, [errors, name, message, aditionalMessages, dispatch]);

	useEffect(() => {
		return () => {
			dispatch(cleanError(name));
		};
	}, [dispatch, name]);

	return message;
}

/**
 * Custom hook to dispatch logout action
 * @returns function
 */
export function useLogout() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [send] = useXhr({
		url: apiEndpoints.logout,
		method: 'POST',
	});

	return () => {
		send({
			showErrorSnackbar: true,
			showSucessSnackbar: true,
		})
			.then(() => {
				dispatch(setLogout());
				history.push(paths.login);
			})
			.catch((err) => {
				console.error('Error: ', err);
				dispatch(
					snackbarMessage(
						err?.message || trans('Components.snackbar.errorMessage')
					)
				);
			});
	};
}
