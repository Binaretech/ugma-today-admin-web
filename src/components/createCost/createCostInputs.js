import Input from "../input/Input";
import { trans } from "../../trans/trans";
import { currencies } from "../../static/currencies";

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
export default (data) => {
    return [
        [
            {
                type: Input,
                props: {
                    name: 'name',
                    label: trans('words.name'),
                    rules: ['required', 'string', 'min:4', 'max:128'],
                    defaultValue: data?.name,
                }
            }
        ],
        [
            {
                type: Input,
                props: {
                    name: 'comment',
                    label: trans('words.comment'),
                    rules: ['nullable', 'string', 'min:4', 'max:128'],
                    defaultValue: data?.comment,
                }
            }
        ],
        [
            {
                type: Input,
                props: {
                    name: 'currency',
                    className: 'price-input',
                    label: trans('words.currency'),
                    displayEmpty: true,
                    placeholder: trans('words.currency'),
                    select: true,
                    defaultValue: data?.currency ?
                        currencies.find((currency) => currency.value === data.currency).value : '',
                    options: currencies,
                    rules: ['required'],
                }
            },
            {
                type: Input,
                props: {
                    name: 'price',
                    type: 'number',
                    defaultValue: data?.price,
                    label: trans('words.price'),
                    rules: ['required', 'number', 'min:0', 'max:9999999999999999,99'],
                }
            }
        ],
    ];
};