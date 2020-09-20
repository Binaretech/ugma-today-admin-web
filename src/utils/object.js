import { deepCloneArray } from "./array";

/**
 * Create a deep clone of a objct
 * @typedef {object} T
 * 
 * @param {T} object
 * @returns {T}
 */
export function deepCloneObject(object) {
    let clone = {};
    for (const key in object) {
        if (Array.isArray(object[key])) {
            clone[key] = deepCloneArray(object[key]);
            continue;
        }

        if (object[key] && typeof object[key] === 'object') {
            clone[key] = deepCloneObject(object[key]);
            continue;
        }

        clone[key] = object[key];
    }

    return clone;
}

/**
 * Compare if two objects has the same content
 * 
 * @typedef {object} T
 * @param {T} object1 
 * @param {T} object2
 * 
 * @returns {boolean} 
 */
export function equalsObjects(object1, object2) {
    const keys = [...Object.keys(object1), ...Object.keys(object2)];

    for (const key of keys) {
        if (Array.isArray(object1[key]) !== Array.isArray(object2[key])) return false;

        if (typeof object1[key] !== typeof object2[key]) return false;

        if (typeof object1[key] !== 'object' && !equalsObjects(object1[key], object2[key])) return false;

        if (object1[key] !== object2[key]) return false;
    }

    return true;
}
