const angular = require('angular');

const createModule = (name, bootstrap = [], options = {}) => {
	const m = angular.module(name, bootstrap);
	const { components, directives, filters, controllers, pathPrefix = 'src/' } = options;

	if (components) {
		components.map(
			n => m.component(kebabToCamelCase(n), require(`${pathPrefix}${n}/${n}`))
		);
	}
	if (directives) {
		directives.map(
			n => m.directive(kebabToCamelCase(n), require(`${pathPrefix}${n}/${n}`))
		);
	}
	if (filters) {
		filters.map(
			n => m.filter(kebabToCamelCase(n), require(`${pathPrefix}${n}/${n}`))
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

const objectToQuery = obj => Object.keys(obj).reduce((str, key) => (str === '' ? `?${key}=${obj[key]}` : `${str}&${key}=${obj[key]}`), '');

const formatDate = d => {
	let day = addLeadingZeroes(d.getDate(), 1);
	let month = addLeadingZeroes(d.getMonth()+1, 1);
	let year = d.getFullYear();

	return `${year}-${month}-${day}`;
}

const addLeadingZeroes = (i, count) => i.toString().padStart(count+i.toString().length, '0').slice(-2);

module.exports = {
	createModule,
	kebabToCamelCase,
	ucFirst,
	objectToQuery,
	formatDate
}
