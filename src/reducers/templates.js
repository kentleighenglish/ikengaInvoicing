const { cloneDeep, merge } = require('lodash');
const { actions } = require('actions/templates');

const d = new Date();

const INITIAL_STATE = {
	defaultTemplate: {
		name: 'Blank',
		colours: {
			primary: '#bc4227',
			secondary: '#659e53'
		},
		fogbugz: {
			useFogbugz: true,
			selectedProject: 5,
			dateFrom: new Date("08/01/2019"),
			dateTo: new Date("08/14/2019"),
			listMode: "week",
			hourlyRate: 16,
			dailyRate: 385,
			dayHours: 7.5,
			useDailyRate: true
		},
		details: {
			company: {
				name: "Ikenga Innovations Ltd",
				address: "Flat 2, 19 New Street\nBedworth, CV12 9DL",
				email: "invoicing@ikengainnovations.com",
				number: "07495074144",
				payableTo: "Ikenga Innovations"
			},
			companyBank: {
				name: 'HSBC Bank Plc',
				accName: 'Ikenga Innovations Ltd',
				accNumber: '1452152',
				sortCode: '40-18-17'
			},
			recipient: {
				name: "Amer Siddiq",
				address: "Locumhive Limited\nKemp House, 15 City Road\nLondon, EC1V 2NX",
				invoiceNumber: "LH006",
				dueDate: d
			},
			submittedDate: d,
			project: "Project Example",
		},
		lineItems: [
			{
				label: "Line Item 1",
				quantity: 1,
				unitPrice: 216.67
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
