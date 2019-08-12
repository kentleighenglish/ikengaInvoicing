const { cloneDeep, merge } = require('lodash');
const { actions } = require('actions/templates');

const INITIAL_STATE = {
	defaultTemplate: {
		name: 'Blank',
		colours: {
			primary: '#bc4227',
			secondary: '#659e53'
		},
		fogbugz: {
			useFogbugz: false,
			selectedProject: null,
			dateFrom: null,
			dateTo: null,
		},
		details: {
			companyName: "Ikenga Innovations Ltd",
			companyAddress: "Flat 2, 19 New Street\nBedworth, CV12 9DL",
			companyEmail: "invoicing@ikengainnovations.com",
			companyNumber: "07495074144",
			submittedDate: "06/07/18",
			project: "Project Example",
			recipientName: "Amer Siddiq",
			recipientAddress: "Locumhive Limited\nKemp House, 15 City Road\nLondon, EC1V 2NX"
		}
	},
	templates: {},
	currentTemplate: null
}

module.exports = (state = cloneDeep(INITIAL_STATE), { type, payload }) => {
	switch(type) {
		case actions.UPDATE_TEMPLATE:
			const { currentTemplate: id } = state;
			const { template } = payload;

			state.templates[id] = state.templates[id] || {};
			state.templates[id] = merge(state.templates[id], template);
		break;
		case actions.SET_CURRENT_TEMPLATE:
			state.currentTemplate = payload.id;

			if (payload.id === 'temp') {
				state.templates[payload.id] = cloneDeep(state.defaultTemplate);
			}
		break;
	}

	return state;
}
