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

emmiter.addListener('click', Message1);
emmiter.addListener('click', Message2);
emmiter.addListener('click', Message3);
emmiter.addListener('click', Message4);

emmiter.emit('click');
