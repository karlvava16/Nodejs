import EventEmmiter, { getMaxListeners } from 'events';

class Buyer {
    #name;
    #email;
    constructor(name, email) {
        this.#name = name;
        this.#email = email;
    }

    getName() {
        return this.#name;
    }
    getEmail() {
        return this.#email;
    }
}

const buyers = [
    new Buyer('John Doe', 'john@example.com'),
    new Buyer('Jane Smith', 'jane@example.com'),
    new Buyer('Alice Johnson', 'alice@example.com'),
    new Buyer('Bob Brown', 'bob@example.com'),
];

const emitter = new EventEmmiter();
emitter.setMaxListeners(3);
console.log(emitter.getMaxListeners());

emitter.on('sale', () => {
    buyers.forEach((buyer) => {
        console.log(
            `${buyer.getName()} there is a sale! Check your email: ${buyer.getEmail()}`,
        );
    });
});

emitter.emit('sale');
console.log(emitter.listenerCount('sale'));

console.log(emitter.eventNames());

/*
    створити клас Buyer (поля: name, email)
    створити подію "sale"
    При виникненні події треба оповістити всіх покупців.
*/
