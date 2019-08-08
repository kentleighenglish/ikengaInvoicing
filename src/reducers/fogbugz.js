const { cloneDeep } = require('lodash');
const { types } = require('actions/fogbugz');

const INITIAL_STATE = {
	projects: [],
	items: [],
	selectedProject: 0,
	settings: {
		dateFrom: null,
		dateTo: null,
		useFogbugz: true
	}
}

module.exports = (state = cloneDeep(INITIAL_STATE), action) => {
	switch(action.type) {
		case types.TOGGLE_FOGBUGZ:
			state.settings.useFogbugz = action.payload ? action.payload : !state.settings.useFogbugz;
		break;
		case types.RECEIVE_PROJECTS:
			state.projects = action.payload;
		break;
	}

	return state;
}
