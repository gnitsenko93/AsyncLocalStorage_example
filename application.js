'use strict';

class Application {

    constructor(options) {
        const { server, controller, logger } = options;

        this._server = server;
        this._controller = controller;
        this._logger = logger;
    }

    async start() {
        this._logger.log('Starting an application.');

        try {
            await this._server.start(this._controller.handle.bind(this._controller));

            this._logger.log('An application is started.');

            return;
        } catch (error) {
            this._logger.error('Error on an application starting.', { error });
        }
        

    }

    async stop() {
        this._logger.log('Starting an application.');

        try {
            await this._server.stop();

            this._logger.log('An application is stopped.');
        } catch (error) {
            this._logger.error('Error on an application stopping.', { error });
        }
        
        return;
    }
}

module.exports = Application;
