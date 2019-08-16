const { apiGetProjects, apiGetItems } = require('../libs/api');
const moment = require('moment');

const actions = {
	FETCH_PROJECTS: 'FETCH_PROJECTS',
	FETCH_PROJECTS_FAILED: 'FETCH_PROJECTS_FAILED',
	RECEIVE_PROJECTS: 'RECEIVE_PROJECTS',
	FETCH_ITEMS: 'FETCH_ITEM',
	FETCH_ITEMS_FAILED: 'FETCH_FAILED_ITEMS',
	RECEIVE_ITEMS: 'RECEIVE_ITEMS'
}

const getProjects = () => async (dispatch, getState) => {
	const { fogbugz: { projects } } = getState();

	if (!projects.length) {
		dispatch({
			type: actions.FETCH_PROJECTS
		});

		const results = await apiGetProjects();

		dispatch({
			type: actions.RECEIVE_PROJECTS,
			payload: results
		});
	}
}

const updateTimesheet = () => async (dispatch, getState) => {
	const { fogbugz: { items }, templates: { templates, currentTemplate } } = getState();
	const template = templates[currentTemplate];

	const { fogbugz: { dateFrom, dateTo, selectedProject } } = template;

	if (dateFrom && dateTo) {
		dispatch({
			type: actions.FETCH_ITEMS
		});

		const results = await apiGetItems(moment(dateFrom).format('YYYY-MM-DD'), moment(dateTo).format('YYYY-MM-DD'), selectedProject);

		dispatch({
			type: actions.RECEIVE_ITEMS,
			payload: results
		});
	}
}

module.exports = {
	actions,
	getProjects,
	updateTimesheet
}
