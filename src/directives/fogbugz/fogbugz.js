

class FogbugzController {

	constructor($scope, $ngRedux) {

		$ngRedux.connect(this.mapStateToThis)(this);
	}

	$onInit()
	{
	}

	mapStateToThis({ templates: { templates, currentTemplate } }) {
		return {
			template: templates[currentTemplate]
		}
	}

}

module.exports = [() => {
	return {
		bindToController: {
			fogbugz: '<'
		},
		restrict: 'A',
		controller: [ '$scope', '$ngRedux', FogbugzController ],
		link: function($scope, $element, attrs, ctrl) {

			$scope.$watch(() => ctrl.template['fogbugz']['useFogbugz'], val => {
				const showOnFb = ctrl.fogbugz;

				if (showOnFb === true || showOnFb === false) {
					const hide = ( (showOnFb && !val) || (!showOnFb && val) );

					$element.css({ display: hide ? 'none' : null });
				}

			});
		}
	}
}];
