const { module } = require('angular');

const AppController = require('./controllers/app.controller');

module('ControllersModule', [])
.controller('appController', AppController);
