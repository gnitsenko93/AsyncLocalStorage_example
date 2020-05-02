'use strict';

const { v4: uuid } = require('uuid');

/** @typedef {import('./broadcaster')} Broadcaster */
/** @typedef {import('async_hooks').AsyncLocalStorage} AsyncLocalStorage */

class Controller {

    constructor(options) {
        const { logger, broadcaster, asyncLocalStorage } = options;

        this._logger = logger;

        /** @type {Broadcaster} */
        this._broadcaster = broadcaster;

        /** @type {AsyncLocalStorage} */
        this._asyncLocalStorage = asyncLocalStorage;
    }

    handle(socket) {
        const requestId = uuid();

        socket.on('end', () => this._onDisconnect(socket));

        socket.on('data', data => this._onMessage(socket, data));

        this._asyncLocalStorage.run(requestId, () => {
            this._logger.log('Handling a new client connection.', { address: socket.address()});
    
            this._broadcaster.connect(socket);

            this._logger.log('A new client connection is handled.', { address: socket.address()});
        });        
    }

    _onDisconnect(socket) {
        const requestId = uuid();

        this._asyncLocalStorage.run(requestId, () => {
            this._logger.log('Handling a client disconnection.');
    
            this._broadcaster.disconnect(socket);

            this._logger.log('A client disconnection is handled.');
        });  
    }

    _onMessage(socket, data) {
        const requestId = uuid();

        this._asyncLocalStorage.run(requestId, () => {
            this._logger.log('Handling a client message.');
    
            this._broadcaster.broadcast({from: socket, data});

            this._logger.log('A client message is handled.');
        }); 
    }
}

module.exports = Controller;
