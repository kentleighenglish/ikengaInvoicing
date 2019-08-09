const axios = require('axios');
const config = require('config');
const debug = require('debug')('app:manuscript');

const rootUrl = config.apiUrl;

const logon = async () => {
	const token = await genericCall('logon');
}

const getProjects = async () => {
	const { projects = [] } = await genericCall('listProjects');

	return projects.reduce((arr, p) => ([
		...arr,
		{
			id: p.ixProject,
			name: p.sProject
		}
	]), []);
}

const genericCall = async (path, data = {}) => {
	const payload = {
		method: 'POST',
		url: `${rootUrl}${path}`,
		data: {
			...data,
			token: config.manuscriptToken
		}
	};

	debug(`Making call to ${payload.url}`);
	console.log('Payload', payload);

	try {
		const { status, data } = await axios(payload);

		if (status === 200) {
			return data.data;
		}
	} catch({ response }) {
		if (response.data) {
			throw response.data.errors;
		}
	}

	return null;
}

const objectToQuery = input => Object.keys(input).reduce((out, key) => {
	val = encodeURIComponent(input[key]);
	return !out.length ? `?${key}=${val}` : `${out}&${key}=${val}`;
}, '');

module.exports = {
	getProjects
}
