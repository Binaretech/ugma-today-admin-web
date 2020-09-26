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
    return typeof value === 'number';
}

export function boolean(value) {
    return typeof value === 'boolean';
}
