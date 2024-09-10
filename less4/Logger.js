import fs from 'node:fs';
import path from 'node:path';

class Logger {
    #logFilePath;

    GetLogFilePath() {
        return this.logFilePath;
    }

    constructor(logFilePath) {
        this.#logFilePath = path.join(logFilePath, 'logs.txt');
        console.log(this.#logFilePath);
    }

    #formatDate() {
        const currentDate = new Date();

        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();

        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    writeLogSync(typeMessage, message) {
        const logMessage = `${this.#formatDate()} [${typeMessage.toUpperCase()}]: ${message}\n`;
        fs.appendFileSync(this.#logFilePath, logMessage);
    }

    writeLog(typeMessage, message) {
        const logMessage = `${this.#formatDate()} [${typeMessage}]: ${message}\n`;

        fs.appendFile(this.#logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Error writing log:', err);
            }
        });
    }

    readLogSync() {
        if (fs.existsSync(this.#logFilePath)) {
            const data = fs.readFileSync(this.#logFilePath, 'utf8');
            return data;
        } else {
            console.error('Error reading logs: File does not exist');
            return null;
        }
    }

    readLog() {
        fs.readFile(this.#logFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading logs:', err);
            } else {
                return data;
            }
        });
    }

    infoSync(message) {
        this.writeLogSync('INFO', message);
    }

    warnSync(message) {
        this.writeLogSync('WARN', message);
    }

    errorSync(message) {
        this.writeLogSync('ERROR', message);
    }

    info(message) {
        this.writeLog('INFO', message);
    }

    warn(message) {
        this.writeLog('WARN', message);
    }

    error(message) {
        this.writeLog('ERROR', message);
    }
}

export { Logger };
