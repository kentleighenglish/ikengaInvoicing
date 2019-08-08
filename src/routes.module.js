const { createModule } = require('./helper');

const { ucFirst } = require('./helper');

const routes = [
	{
		name: "home",
		url: "/"
	},
	{
		name: "edit",
		url: "/edit"
	}
];

createModule('RoutesModule', [], {
	pathPrefix: './routes/',
	controllers: routes.map(route => route.name)
});

module.exports = routes.map(route => ({
	...route,
	controller: ucFirst(`${route.name}Controller`) + ' as vm',
	template: require(`./routes/${route.name}/${route.name}.html`).default
}));
