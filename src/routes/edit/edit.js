const { getProjects } = require('actions/fogbugz');
const { setCurrentTemplate } = require('actions/templates');

class EditController {

	constructor($scope, $ngRedux) {

		$ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
	}

	mapStateToThis({ router: { toParams: { id } } }) {
		return {
			id
		}
	}

	mapDispatchToThis(dispatch) {
		return {
			getProjects: () => dispatch(getProjects()),
			setCurrentTemplate: id => dispatch(setCurrentTemplate(id))
		}
	}

	$onInit() {
		this.getProjects();

		this.setCurrentTemplate(this.id || 'temp');
	}

}

module.exports = [ '$scope', '$ngRedux', EditController ];
