const axios = require('axios');
const config = require('config');
const debug = require('debug')('app:manuscript');

const rootUrl = "https://apisandbox.manuscript.com/api/";

const logon = async () => {
	const token = await genericCall('logon');

	console.log(token);
}

const getProjects = async () => {
	await logon();

	return await genericCall('listProjects');
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

	const response = await axios(payload);

	if (response.status === 200) {
		return response.data;
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
