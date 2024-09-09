import EventEmmiter from 'events';

const emmiter = new EventEmmiter();

function Message1() {
    console.log('1 message');
}

function Message2() {
    console.log('2 message');
}

function Message3() {
    console.log('3 message');
}

function Message4() {
    console.log('4 message');
}

emmiter.addListener('error', Message1);
emmiter.addListener('error', Message2);
emmiter.addListener('error', Message3);
emmiter.addListener('error', Message4);

console.log('|first emit|');
emmiter.emit('error');

console.log('|unsub|');
emmiter.off('error', Message3);

console.log('|second emit|');
emmiter.emit('error');
