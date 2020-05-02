'use strict';

class Broadcaster {

    constructor(options) {
        const { logger, streamer } = options;

        this._logger = logger;
        this._streamer = streamer;
    }

    connect(socket) {
        this._logger.log('Registering a client connection.');

        this._streamer.register(socket);

        this._logger.log('A client connection is registered.');

        socket.write('Welcome to the chat!\n');
    }

    broadcast(options) {
        const { from, data } = options; 

        this._logger.log('Broadcasting a client message.', { data: data.toString() });

        this._streamer.broadcast({ from, data });

        this._logger.log('A message has been broadcasted.', { data: data.toString() });
    }

    disconnect(socket) {
        this._logger.log('Unregistering a client.');

        this._streamer.unregister(socket);

        this._logger.log('A client is unregistered.');
    }
}

module.exports = Broadcaster;
