'use strict';

const net = require('net');

class Server {

    constructor(options) {
        const {
            host, port, logger
        } = options;

        this._host = host;
        this._port = port;
        this._logger = logger;
    }

    async start(controller) {
        return new Promise((res, rej) => {
            this._logger.log('Starting a server.', { host: this._host, port: this._port });

            this._server = net.createServer(controller);

            this._server.listen(this._port, this._host, error => {
                if (error) {
                    this._logger.error('Error on a server starting.', { error });
                    
                    return rej(error);
                }

                this._logger.log('A server is started.', { host: this._host, port: this._port });

                return res();
            });
        });
    }

    async stop() {
        return new Promise((res, rej) => {
            this._logger.log('Stopping a server.', { host: this._host, port: this._port });

            this._server.close(error => {
                if (error) {
                    this._logger.error('Error on a server stopping.', { error });

                    return rej(error);
                }

                this._logger.log('A server is stopped.', { host: this._host, port: this._port });

                return res();
            })
        });
    }
}

module.exports = Server;
