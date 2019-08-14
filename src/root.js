const angular = require('angular');
const { createStore, applyMiddleware } = require('redux');
const { createLogger } = require('redux-logger');

const thunk = require('redux-thunk').default;
const anime = require('animejs').default;

require('ng-redux');
require('@uirouter/angularjs');
const { Visualizer } = require('@uirouter/visualizer');
const { router } = require('redux-ui-router');

var middleware = [
	thunk
];

if (ENV_MODE === 'development') {
	middleware = [
		...middleware,
		createLogger()
	];
}

// Socket Factory
// const SocketFactory = require('shared/factories/socket.factory');


const init = (modules, rootReducer, routes) => {
	// Create Redux reducers
	const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

	// Initialise App structure
	angular.module('app', [
		...modules,
		'ngRedux',
		'ng-ui-router-middleware',
		'ui.router'
	])
	.config(['$ngReduxProvider', function($ngReduxProvider) {
		$ngReduxProvider.provideStore(store);
	}])
	// Routing Config
	.config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {
		$locationProvider.html5Mode(true);

		routes.map($stateProvider.state);
	}])
	.config(['$uiRouterProvider', function($uiRouter) {
		// $uiRouter.plugin(Visualizer)
	}])
	.service('anime', () => anime);
	// .factory('socket', SocketFactory)

	angular.bootstrap(document, [ 'app' ]);
}

module.exports = {
	init
}
