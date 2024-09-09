import EventEmitter from 'events';

class Logger extends EventEmitter {
    info(message) {
        this.emit('info', message);
    }

    warn(message) {
        this.emit('warn', message);
    }

    error(message) {
        this.emit('error', message);
    }
}

const logger = new Logger();

logger.on('info', (message) => {
    console.log(`INFO: ${message}`);
});

logger.on('warn', (message) => {
    console.log(`WARNING: ${message}`);
});

logger.on('error', (message) => {
    console.error(`ERROR: ${message}`);
});

logger.info('New user');
logger.warn('Can cause a stack overflow');
logger.error('Stack overflow');
