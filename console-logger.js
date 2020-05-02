'use strict';

class ConsoleLogger {

    constructor(options) {
        const { asyncLocalStorage } = options;

        this._asyncLocalStorage = asyncLocalStorage;
    }

    log(msg, meta) {
        console.log(this._format(msg, meta));
    }

    error(msg, meta) {
        console.error(this._format(msg, meta));
    }

    _format(msg, meta = {}) {
        let timestamp, message, additions = '', requestId;

        timestamp = '[' + (new Date()).toISOString() + ']';

        requestId = '[' + (this._asyncLocalStorage.getStore() || '-') + ']';

        message = '[' + msg + ']';

        if (Object.keys(meta).length) {
            additions = '[' + JSON.stringify(meta) + ']';
        }

        return `${timestamp} ${requestId} ${message} ${additions}`;
    }
}

module.exports = ConsoleLogger;
