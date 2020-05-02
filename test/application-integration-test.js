'use strict';

const net = require('net');

const { AsyncLocalStorage } = require('async_hooks');

const Application = require('../application');
const Server = require('../server');
const Controller = require('../controller');
const Broadcaster = require('../broadcaster');
const Streamer = require('../streamer');

const ConsoleLogger = require('../console-logger');

const { host, port } = require('../config.json');

const asyncLocalStorage = new AsyncLocalStorage();

const logger = new ConsoleLogger({ asyncLocalStorage });
const streamer = new Streamer({ logger });
const broadcaster = new Broadcaster({ logger, streamer });
const controller = new Controller({ logger, broadcaster, asyncLocalStorage });
const server = new Server({ host, port, logger });
const application = new Application({ server, controller, logger });

const CONNECTION_NUMBER = 10;
const TIMEOUT = 1000;

console.log('Starting integration test.');

application.start()
    .then(() => {
        return new Promise((res, rej) => {
            for (let i = 0; i < 10; i++) {
                const connection = net.createConnection(port, host, () => {
                    connection.write('Hello, chat!');
                });
            
                connection.setTimeout(TIMEOUT, () => {
                    connection.end();

                    if (i === CONNECTION_NUMBER - 1) res();
                });
            }
        })
    })
    .then(async () => {
        await application.stop();

        console.log('Integration test has passed.');
    });
