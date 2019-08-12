const { createModule } = require('./helper');

createModule('FiltersModule', [], {
	pathPrefix: './filters/',
	filters: [
		'nl2br'
	]
});
