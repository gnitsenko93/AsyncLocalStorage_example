'use strict';

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

application.start();
