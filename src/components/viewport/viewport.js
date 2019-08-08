require('./viewport.scss');

class ViewportController {

	constructor($scope, $ngRedux) {

	}

}


module.exports = {
	controller: [ '$scope', '$ngRedux', ViewportController ],
	controllerAs: 'vm',
	template: require('./viewport.html').default
}
