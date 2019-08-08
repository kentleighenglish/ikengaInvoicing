const { init } = require('./root');

// Fetch SCSS core file
require('./scss/bootstrap.scss');
require('./app.module');
const routes = require('./routes.module');

const rootReducer = require('./reducers');


init(
	[ 'AppModule' ],
	rootReducer,
	routes
)
