const Datastore = require('nedb');
const path = require('path');
const debug = require('debug')('app:db');
const db = new Datastore({ filename: path.resolve('store', 'data.db') });


const getTemplates = async () => {
	const results = await db.find({});

	return results || [];
}

const saveTemplate = async (data) => {

}

module.exports = {
	getTemplates,
	saveTemplate
}
