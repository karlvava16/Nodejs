// User.js

class User {
    #_name;
    #_age;

    constructor(name, age) {
        this.#_age = age;
        this.#_name = name;
    }

    getName() {
        this.#_name;
    }

    getAge() {
        this.#_name;
    }

    toString() {
        return `Name: ${this.#_name} Age: ${this.#_age}`;
    }
}

const PI = 3.14;

module.exports = { User, PI };
