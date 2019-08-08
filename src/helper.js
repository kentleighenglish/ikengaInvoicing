const angular = require('angular');

const createModule = (name, bootstrap = [], options = {}) => {
	const m = angular.module(name, bootstrap);
	const { components, directives, controllers, pathPrefix = 'src/' } = options;

	if (components) {
		components.map(
			n => m.component(kebabToCamelCase(n), require(`${pathPrefix}${n}/${n}`))
		);
	}
	if (controllers) {
		controllers.map(
			n => m.controller(ucFirst(`${n}Controller`), require(`${pathPrefix}${n}/${n}`))
		);
	}
}

const kebabToCamelCase = str => str.replace(/\-([A-z])/g, (match, m) => m.toUpperCase());

const ucFirst = str => str.replace(/^./, m => m.toUpperCase());

module.exports = {
	createModule,
	kebabToCamelCase,
	ucFirst
}
