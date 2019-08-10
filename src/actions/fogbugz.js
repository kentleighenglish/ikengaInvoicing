const { apiGetProjects } = require('../libs/api');

const actions = {
	FETCH_PROJECTS: 'FETCH_PROJECTS',
	FETCH_PROJECTS_FAILED: 'FETCH_PROJECTS_FAILED',
	RECEIVE_PROJECTS: 'RECEIVE_PROJECTS'
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

module.exports = {
	actions,
	getProjects
}
