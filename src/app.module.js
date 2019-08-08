const { module } = require('angular');

require('./controllers.module');
require('./components.module');

module('AppModule', [
	'ControllersModule',
	'ComponentsModule',
	'RoutesModule'
]);
