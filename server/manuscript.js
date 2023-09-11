const axios = require('axios');
const config = require('config');
const debug = require('debug')('app:manuscript');
const moment = require('moment');

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

const getItems = async ({ project = null, dateFrom, dateTo }) => {
	const { intervals = [] } = await genericCall('listIntervals', {
		dtStart: moment(dateFrom).set('hour', 0).toISOString(),
		dtEnd: moment(dateTo).add(1, 'day').toISOString()
	});

	let intervalCases = await Promise.all(intervals
		.reduce((arr, { ixBug }) => (arr.indexOf(ixBug) === -1 ? [ ...arr, ixBug ] : arr), [])
		.map(async c => {
			const results = await genericCall('search', { q: c, cols: [ "ixProject" ] });

			return results.cases[0];
		})
	);

	const matchingCases = intervalCases.filter(c => c.ixProject === parseInt(project));

	const results = intervals.filter(interval => {
		return (matchingCases.find(c => c.ixBug === interval.ixBug) !== -1 && interval.fDeleted === false && interval.dtStart && interval.dtEnd);
	});

	return results.reduce((arr, c) => ([
		...arr,
		{
		title: c.sTitle,
		start: c.dtStart,
		end: c.dtEnd
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
	getProjects,
	getItems
}
