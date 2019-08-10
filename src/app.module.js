const { module } = require('angular');

require('./controllers.module');
require('./components.module');
require('./directives.module');

module('AppModule', [
	'ControllersModule',
	'ComponentsModule',
	'DirectivesModule',
	'RoutesModule'
]);
