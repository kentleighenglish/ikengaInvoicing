const { getProjects } = require('actions/fogbugz');

class EditController {

	constructor($scope, $ngRedux) {

		$ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
	}

	mapStateToThis() {
		return {}
	}

	mapDispatchToThis(dispatch) {
		return {
			getProjects: () => dispatch(getProjects())
		}
	}

	$onInit() {
		this.getProjects();
	}

}

module.exports = [ '$scope', '$ngRedux', EditController ];
