export function hasContent(value) {
    if (value === undefined || value === null) return false;
    if (typeof value === 'string' && value === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (typeof value === "object" && Object.keys(value).length === 0) return false;

    return true;
}