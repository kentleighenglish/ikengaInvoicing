
require('./dynamic-input.scss');

class DynamicInputController {

	constructor($scope, $el) {
		this.$scope = $scope;
		this.$el = $el;
	}

	$onInit() {
		this.options = [];

		this.$scope.$watch(() => typeof this.field.options === 'function' ? this.field.options() : this.field.options, o => this.options = o, true);

		if (this.field.type === 'textarea') {
			this.$scope.$watch(() => this.field.value, () => this.updateDynamicHeight(), true);
		}
	}

	updateDynamicHeight() {
		const newlines = this.field.value.split("\n").length;

		console.log(this.field.value);
		if (newlines) {
			const height = (newlines * 22) + 18 + 'px';

			console.log(height);
			this.dynamicHeight = height;
		}
	}
}

module.exports = {
	bindings: {
		field: "<",
		onChange: "&"
	},
	controllerAs: 'vm',
	controller: [ '$scope', '$element', DynamicInputController ],
	template: require('./dynamic-input.html').default
}
