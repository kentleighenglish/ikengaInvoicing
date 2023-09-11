const { combineReducers } = require('redux');
const { router } = require('redux-ui-router');

fogbugz = require('./fogbugz');
templates = require('./templates');

module.exports = combineReducers({
	fogbugz,
	router,
	templates
});
