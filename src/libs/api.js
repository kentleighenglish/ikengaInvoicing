const axios = require('axios');

const host = window.location.origin;

const apiGetProjects = async () => {
	return apiCall('projects');
}

const apiCall = async (path) => {
	const { status, data = null } = await axios({
		method: 'GET',
		url: `${host}/api/${path}`
	});

	if (status === 200 && data.success) {
		return data.data;
	}
}

module.exports = {
	apiGetProjects
}
