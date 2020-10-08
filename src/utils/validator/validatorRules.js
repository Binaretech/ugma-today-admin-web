import { hasContent } from "../common";

export function required(value) {
    return hasContent(value);
}

export function nullable(value) {
    return value !== undefined;
}

export function string(value) {
    if (!hasContent(value)) return true;
    return typeof value === 'string';
}

export function number(value) {
    if (!hasContent(value)) return true;
    return typeof value === 'number' || parseInt(value, 10);
}

export function boolean(value = null) {
    if (!hasContent(value)) return true;
    return typeof value === 'boolean';
}

export function min(value, rules, minValue) {
    if (!hasContent(value)) return true;
    minValue = parseFloat(minValue);

    if (rules.includes('number')) return value >= minValue;
    return value.length >= minValue;
}

export function max(value = null, rules, maxValue) {
    if (!hasContent(value)) return true;
    maxValue = parseFloat(maxValue);

    if (rules.includes('number')) return value <= maxValue;
    return value.length <= maxValue;
}