const { get, find } = require('lodash');

class CanvasFieldController {

	constructor($scope, $ngRedux, $filter) {
		this.$filter = $filter;

		$ngRedux.connect(this.mapStateToThis)(this);
	}

	$onInit()
	{
	}

	mapStateToThis({ fogbugz: { projects }, templates: { templates, currentTemplate } }) {
		const template = templates[currentTemplate];
		const projectId = template['fogbugz']['selectedProject'] || null;

		return {
			template: {
				...template,
				project: projectId ? find(projects, { id: parseInt(projectId) }) : {}
			}
		}
	}

}

module.exports = [() => {
	return {
		bindToController: {
			canvasField: '@'
		},
		restrict: 'A',
		controller: [ '$scope', '$ngRedux', '$filter', CanvasFieldController ],
		link: function($scope, $element, attrs, ctrl) {
			$scope.$watch(() => ctrl.canvasField ? get(ctrl.template, ctrl.canvasField, null) : null, val => {
				const value = ctrl.$filter('nl2br')(val || '');

				$element.html(value);
			}, true)
		}
	}
}];
