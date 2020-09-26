export function required(value) {
    return value !== undefined && value !== null;
}

export function nullable(value) {
    return value !== undefined;
}

export function string(value) {
    if (!value) return true;
    return typeof value === 'string';
}

export function number(value) {
    if (!value) return true;
    return typeof value === 'number' || parseInt(value, 10);
}

export function boolean(value) {
    return typeof value === 'boolean';
}

export function min(value, rules, minValue) {
    if (rules.includes('number')) return value >= minValue;
    return value.length >= minValue;
}

export function max(value, rules, maxValue) {
    console.log(value, rules, maxValue);
    if (rules.includes('number')) return value <= maxValue;
    return value.length <= maxValue;
}