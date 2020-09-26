import TextInput from "../../components/textInput/TextInput";
import { trans } from "../../trans/trans";

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
export default () => ([
    [
        {
            type: TextInput,
            props: {
                name: 'name',
                label: trans('words.name'),
                rules: ['required', 'string', 'min:4', 'max:128'],
            }
        }
    ],
    [
        {
            type: TextInput,
            props: {
                name: 'comment',
                label: trans('words.comment'),
                rules: ['required', 'string', 'min:4', 'max:128'],
            }
        }
    ],
    [
        {
            type: TextInput,
            props: {
                name: 'currency',
                className: 'price-input',
                label: trans('words.currency'),
                select: true,
                options: [
                    {
                        value: 'USD',
                        label: '$',
                    },
                    {
                        value: 'EUR',
                        label: '€',
                    },
                    {
                        value: 'BTC',
                        label: '฿',
                    },
                    {
                        value: 'JPY',
                        label: '¥',
                    },
                ],
                rules: ['required'],
            }
        },
        {
            type: TextInput,
            props: {
                name: 'price',
                type: 'number',
                label: trans('words.price'),
                rules: ['required', 'number', 'min:0', 'max:9999999999999999,99'],
            }
        }
    ],
]);