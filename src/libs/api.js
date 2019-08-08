const axios = require('axios');

const host = window.location.origin;

const apiGetProjects = () => {
	return apiCall('projects');
}

const apiCall = async (path) => {
	const response = await axios({
		method: 'GET',
		url: `${host}/api/${path}`
	});

	if (response.success) {
		return response.data;
	}
}

module.exports = {
	apiGetProjects
}
