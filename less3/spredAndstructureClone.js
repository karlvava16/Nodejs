const user = {
    name: 'Alex',
    age: 18,
    address: {
        streeet: 'Sadova',
        house: 20,
    },
};

let user2 = { ...user };
user.address.house = 100;

console.table(user);
console.table(user2);

user2 = structuredClone(user);
user.address.house = 50;

console.table(user);
console.table(user2);
