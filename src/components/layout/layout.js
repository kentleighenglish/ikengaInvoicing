require('./layout.scss');

class LayoutController {

	constructor($scope, $ngRedux) {
		$ngRedux.connect(this.mapStateToThis)(this);
	}

	mapStateToThis(state) {
		return {
			currentLayout: 'default'
		}
	}
}

module.exports = {
	transclude: true,
	controllerAs: 'vm',
	controller: [ '$scope', '$ngRedux', LayoutController ],
	template: require('./layout.html').default
}
