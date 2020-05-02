'use strict';

const _ = require('lodash');
const stream = require('stream');

class Streamer extends stream.PassThrough {

    constructor(options) {
        super();

        const { logger } = options;

        this._logger = logger;

        this._sockets = [];
    }

    register(socket) {
        this._sockets.push(socket);
    }

    broadcast(options) {
        const { from, data } = options;

        _.forEach(this._sockets, socket => { 
            if (socket !== from) socket.write(data);
        });
    }

    unregister(socket) {
        _.remove(this._sockets, _socket => socket);
    }
}

module.exports = Streamer;
