import { deepCloneObject, equalsObjects } from "./object";

/**
 * Create a deep array clone
 * 
 * @param {Array<T>} array
 * @returns {Array<T>} 
 */
export function deepCloneArray(array) {
    let clone = []

    for (let index = 0; index < array.length; index++) {
        if (Array.isArray(array[index])) {
            clone[index] = deepCloneArray(array[index]);
            continue;
        }

        if (array[index] && typeof array[index] === 'object') {
            clone[index] = deepCloneObject(array[index]);
            continue;
        }

        clone[index] = array[index];
    }

    return clone;
}

/**
 * Compare if arrays has the same content
 * 
 * @param {Array} array1 
 * @param {Array} array2 
 * @returns {boolean}
 */
export function equalsArrays(array1, array2) {
    if (array1.length !== array2.length) return false;

    for (let index = 0; index < array1.length; index++) {
        if (Array.isArray(array1[index]) !== Array.isArray(array2[index])) return false;

        if (typeof array1[index] !== typeof array2[index]) return false;

        if (typeof array1[index] === 'object' && !equalsObjects(array1[index], array2[index])) return false;

        if (array1[index] !== array2[index]) return false;
    }

    return true;
}
