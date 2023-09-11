
class AppController {

	constructor($scope, $ngRedux) {
		$ngRedux.connect(this.mapPropsToThis)(this);
	}

	mapPropsToThis({ router: { currentParams: routerParams } }) {
		return {
			routerParams
		}
	}

	$onInit() {
	}
}

module.exports = [ '$scope', '$ngRedux', AppController ]
