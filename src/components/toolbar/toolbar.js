require('./toolbar.scss');

class ToolbarController {
	
	constructor($scope, $ngRedux) {
		
	}
	
	reset() {
		
	}
}


module.exports = {
	controller: [ '$scope', '$ngRedux', ToolbarController ],
	controllerAs: 'vm',
	template: require('./toolbar.html').default
}
