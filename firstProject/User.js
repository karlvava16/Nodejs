// User.js

class User {
    #_name;
    #_age;

    constructor(name, age) {
        this.#_age = age;
        this.#_name = name;
    }

    getName() {
        return this.#_name;
    }

    getAge() {
        return this.#_age;
    }

    toString() {
        return `Name: ${this.#_name} Age: ${this.#_age}`;
    }
}

const PI = 3.14;

export default User;
//module.exports = { User, PI };
