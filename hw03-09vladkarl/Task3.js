import EventEmitter from 'events';

class Dice extends EventEmitter {
    roll() {
        const result = Math.floor(Math.random() * 6) + 1;

        this.emit('rolled', result);
    }
}

const dice = new Dice();

dice.on('rolled', (result) => {
    console.log(`Roll result: ${result}`);
});

dice.roll();
dice.roll();
