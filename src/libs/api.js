const axios = require('axios');
const { objectToQuery } = require('../helper');

const host = window.location.origin;

const apiGetProjects = async () => {
	return apiCall('projects');
}

const apiGetItems = async (dateFrom, dateTo, project) => {
	return apiCall('items'+objectToQuery({ dateFrom, dateTo, project }));
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
	apiGetProjects,
	apiGetItems
}
