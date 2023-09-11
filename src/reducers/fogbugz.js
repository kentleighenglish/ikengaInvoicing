const { cloneDeep } = require('lodash');
const { actions } = require('actions/fogbugz');

const INITIAL_STATE = {
	projects: [],
	items: []
}

module.exports = (state = cloneDeep(INITIAL_STATE), { type, payload }) => {
	switch(type) {
		case actions.RECEIVE_PROJECTS:
			state.projects = payload || [];
		break;
		case actions.RECEIVE_ITEMS:
			state.items = payload || [];
		break;
	}

	return state;
}
