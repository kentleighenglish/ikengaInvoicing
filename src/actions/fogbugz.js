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

const getProjects = () => dispatch => {
	dispatch({
		type: types.FETCH_PROJECTS
	})

	apiGetProjects().then(projects => {

		dispatch({
			type: types.RECEIVE_PROJECTS,
			payload: projects
		})
	});
}

module.exports = {
	types,
	useFogbugzToggle,
	getProjects
}
