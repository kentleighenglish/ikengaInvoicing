const { createModule } = require('./helper');

createModule('DirectivesModule', [], {
	pathPrefix: './directives/',
	directives: [
		'fogbugz',
		'canvas-field'
	]
});
