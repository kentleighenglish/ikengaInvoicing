
require('./dynamic-input.scss');

class DynamicInputController {

	constructor($scope) {
		this.$scope = $scope;
	}

	$onInit() {
		this.options = [];

		this.$scope.$watch(() => typeof this.field.options === 'function' ? this.field.options() : this.field.options, o => this.options = o, true);
	}
}

module.exports = {
	bindings: {
		field: "<",
		onChange: "&"
	},
	controllerAs: 'vm',
	controller: [ '$scope', DynamicInputController ],
	template: require('./dynamic-input.html').default
}
