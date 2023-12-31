const express = require('express')
const app = express();
const path = require('path');
const config = require('config');
const debug = require('debug')('app:server');
const fs = require('fs');

const db = require('./server/db');
const ms = require('./server/manuscript');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/api/:endpoint', async (request, response) => {
	const { params, query } = request;

	debug(`Received API Request from ${request.headers.referer}`);

	let output = {
		data: null,
		success: true,
		errors: []
	}

	try {
		switch(params.endpoint) {
			case 'projects':
				output.data = await ms.getProjects();
			break;
			case 'items':
				output.data = await ms.getItems(query);
			break;
			default:
				throw 'Endpoint does not exist';
		}
	} catch(e) {
		console.error(e);
		output.errors.push(e.message);
		response.status(500);
	}

	debug('Sending API Response:', JSON.stringify(output));

	response.setHeader('Content-Type', 'application/json');
	response.send(JSON.stringify(output));
});

app.get('/*', (request, response) => {
	response.sendFile(path.resolve('index.html'));
});

var listener = app.listen(config.port, () => {
  debug('Server listening on: ' + listener.address().port);
});
