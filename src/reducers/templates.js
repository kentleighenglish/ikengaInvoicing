const { cloneDeep } = require('lodash');

const INITIAL_STATE = {
	templates: [],
	currentTemplate: null
}

module.exports = (state = cloneDeep(INITIAL_STATE), action) => {
	switch(action.type) {

	}

	return state;
}
