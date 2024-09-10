import { Logger } from './Logger.js';

const __filename = import.meta.filename;

const __dirname = import.meta.dirname;

const logger = new Logger(__dirname);

logger.info('Done task async');
logger.warn('File can be corrupted async');
logger.error('File corrupted async');

logger.infoSync('Done task sync');
logger.warnSync('File can be corrupted sync');
logger.errorSync('File corrupted sync');

console.log(logger.readLogSync());

console.log(logger.readLog());
