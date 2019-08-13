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
			hourlyRate: 0,
			dailyRate: 0,
			useDailyRate: false
		},
		details: {
			company: {
				name: "Ikenga Innovations Ltd",
				address: "Flat 2, 19 New Street\nBedworth, CV12 9DL",
				email: "invoicing@ikengainnovations.com",
				number: "07495074144"
			},
			companyBank: {
				name: 'HSBC Bank Plc',
				accName: 'Ikenga Innovations Ltd',
				accNumber: '1452152',
				sortCode: '40-18-17'
			},
			recipient: {
				name: "Amer Siddiq",
				address: "Locumhive Limited\nKemp House, 15 City Road\nLondon, EC1V 2NX"

			},
			submittedDate: "06/07/18",
			project: "Project Example",
		},
		lineItems: [
			{
				label: "Line Item 1",
				quantity: 1,
				unitPrice: 0
			}
		]
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
