const { createModule } = require('./helper');

createModule('ComponentsModule', [], {
	pathPrefix: './components/',
	components: [
		'layout',
		'toolbar',
		'sidebar',
		'viewport',
		'page-canvas'
	]
});
