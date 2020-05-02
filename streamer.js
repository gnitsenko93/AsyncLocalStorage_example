'use strict';

class Streamer {

    constructor(options) {
        const { logger } = options;

        this._logger = logger;

        this._sockets = [];
    }

    register(socket) {
        this._sockets.push(socket);
    }

    broadcast(options) {
        const { from, data } = options;

        this._sockets.forEach(socket => { 
            if (socket !== from) socket.write(data);
        });
    }

    unregister(socket) {
        const sockets = [];

        this._sockets.forEach(_socket => {
            if (_socket !== socket) this._sockets.push(socket);
        })

        this._sockets = sockets;
    }
}

module.exports = Streamer;
