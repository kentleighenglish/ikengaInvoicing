const { cloneDeep } = require('lodash');

const INITIAL_STATE = {
	colours: {
		primary: '#bc4227',
		secondary: '#659e53'
	},
	address: {

	},
	details: {
		project: 'Project Name',
	},
	manualItems: []
}

module.exports = (state = cloneDeep(INITIAL_STATE), action) => {
	switch(action.type) {

	}

	return state;
}
