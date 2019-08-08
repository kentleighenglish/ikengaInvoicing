const { combineReducers } = require('redux');
const { router } = require('redux-ui-router');

fogbugz = require('./fogbugz');
canvas = require('./canvas');
templates = require('./templates');

module.exports = combineReducers({
	fogbugz,
	canvas,
	router,
	templates
});
