const { omit } = require('lodash');

require('./template-list.scss');

class TemplateListController {

	constructor($scope, $ngRedux) {

		$ngRedux.connect(this.mapStateToThis)(this);
	}

	mapStateToThis({ templates: { templates } }) {
		return {
			templates: omit(templates, [ 'temp' ])
		}
	}

}

module.exports = {
	controller: [ '$scope', '$ngRedux', TemplateListController ],
	controllerAs: 'vm',
	template: require('./template-list.html').default
}
