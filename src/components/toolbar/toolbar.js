const { cloneDeep } = require('lodash');
const { useFogbugzToggle } = require('actions/templates');

require('./toolbar.scss');

class ToolbarController {

	constructor($scope, $ngRedux) {
		$ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
	}

	mapStateToThis({ templates: { templates, currentTemplate } }) {
		return {
			template: templates[currentTemplate]
		}
	}

	mapDispatchToThis(dispatch) {
		return {
			useFogbugzToggle: value => dispatch(useFogbugzToggle(value))
		}
	}
}


module.exports = {
	controller: [ '$scope', '$ngRedux', ToolbarController ],
	controllerAs: 'vm',
	template: require('./toolbar.html').default
}
