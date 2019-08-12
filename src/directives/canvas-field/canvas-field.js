const { get } = require('lodash');

class CanvasFieldController {

	constructor($scope, $ngRedux, $filter) {
		this.$filter = $filter;

		$ngRedux.connect(state =>this.mapStateToThis(state, this))(this);
	}

	$onInit()
	{
	}

	mapStateToThis({ templates: { templates, currentTemplate } }, props) {
		return {
			fieldValue: props.canvasField ? get(templates[currentTemplate], props.canvasField) : null
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

			$scope.$watch(() => ctrl.fieldValue, val => {
				const value = ctrl.$filter('nl2br')(ctrl.fieldValue || '');

				$element.html(value);
			})
		}
	}
}];
