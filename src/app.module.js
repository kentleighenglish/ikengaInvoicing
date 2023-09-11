const { module } = require('angular');

require('./controllers.module');
require('./components.module');
require('./directives.module');
require('./filters.module');

module('AppModule', [
	'ControllersModule',
	'ComponentsModule',
	'DirectivesModule',
	'FiltersModule',
	'RoutesModule'
]);
