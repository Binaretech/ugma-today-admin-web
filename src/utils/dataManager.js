export default class DataManager {
    constructor() {
        this.data = {};
    }

    setValue(name, value) {
        this.data[name] = value;
    }
}