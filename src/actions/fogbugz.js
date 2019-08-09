const { apiGetProjects } = require('../libs/api');

const types = {
	TOGGLE_FOGBUGZ: 'TOGGLE_FOGBUGZ',
	FETCH_PROJECTS: 'FETCH_PROJECTS',
	FETCH_PROJECTS_FAILED: 'FETCH_PROJECTS_FAILED',
	RECEIVE_PROJECTS: 'RECEIVE_PROJECTS'
}

const useFogbugzToggle = (value) => ({
	type: types.TOGGLE_FOGBUGZ,
	payload: value
});

const getProjects = () => async (dispatch, getState) => {
	const { fogbugz: { projects } } = getState();

	if (!projects.length) {
		dispatch({
			type: types.FETCH_PROJECTS
		});

		const results = await apiGetProjects();

		dispatch({
			type: types.RECEIVE_PROJECTS,
			payload: results
		});
	}
}

module.exports = {
	types,
	useFogbugzToggle,
	getProjects
}
