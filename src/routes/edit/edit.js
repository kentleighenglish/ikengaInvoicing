const { getProjects, updateTimesheet } = require('actions/fogbugz');
const { setCurrentTemplate } = require('actions/templates');

class EditController {

	constructor($scope, $ngRedux) {
		this.$scope = $scope;

		$ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
	}

	mapStateToThis({ templates: { templates, currentTemplate }, router: { toParams: { id } } }) {
		const template = currentTemplate ? templates[currentTemplate] : null;

		return {
			id,
			templates,
			template
		}
	}

	mapDispatchToThis(dispatch) {
		return {
			getProjects: () => dispatch(getProjects()),
			setCurrentTemplate: id => dispatch(setCurrentTemplate(id)),
			updateTimesheet: () => dispatch(updateTimesheet())
		}
	}

	$onInit() {
		this.getProjects();

		if (!this.templates['temp']) {
			this.setCurrentTemplate(this.id || 'temp');
		}

		this.$scope.$watch(() => {
			const { fogbugz: { dateFrom, dateTo } } = this.template;
			return { dateFrom, dateTo };
		}, () => {
			this.updateTimesheet();
		}, true);
	}

}

module.exports = [ '$scope', '$ngRedux', EditController ];
