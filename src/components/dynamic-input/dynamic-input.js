
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

		if (newlines) {
			const height = (newlines * 22) + 18 + 'px';

			this.dynamicHeight = height;
		}
	}

	toggleCheckbox() {
		if (this.field.type === 'checkbox') {
			this.field.value = !this.field.value;

			this.onChange({ field: this.field });
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
