/**
 * Returns true if ```value``` has some content
 * @param {any} value 
 * @returns {boolean}
 */
export function hasContent(value) {
    if (value === undefined || value === null) return false;
    if (typeof value === 'string' && value === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (typeof value === "object" && Object.keys(value).length === 0) return false;

    return true;
}