const { cloneDeep, find } = require('lodash');
require('./page-canvas.scss');

class PageCanvasController {

	constructor($element, $scope, $ngRedux) {
		this.$scope = $scope;

		this.aspect = .70707070;

		this.width = 0;
		this.fontSize = 0;
		this.height = null;

		this.height = $element[0].clientHeight;

		$ngRedux.connect(this.mapStateToThis)(this);

		window.addEventListener('resize', (e) => {
			if ($element[0]) {
				this.height = $element[0].clientHeight;
			}

			this.calculateSizes();
		});

		this.calculateSizes();
	}

	mapStateToThis({ fogbugz: { projects }, templates: { templates, currentTemplate } }) {
		const template = templates[currentTemplate];

		let lineItems = [];
		if (template['fogbugz']['useFogbugz']) {

		} else {
			lineItems = template.lineItems.reduce((arr, item) => ([
				...arr,
				{
					...item,
					totalPrice: (item.quantity * item.unitPrice),
				}
			]), []);
		}

		const subTotal = lineItems.reduce((out, i) => out + i.totalPrice, 0);

		const vat = (subTotal * .2);

		return {
			fb: template['fogbugz']['useFogbugz'],
			t: template,
			lineItems,
			subTotal,
			vat,
			grandTotal: subTotal + vat
		}
	}

	calculateSizes() {
		var width = (this.height * this.aspect);
		var fontSize = (this.height / 1000);

		if(width !== this.width || fontSize !== this.fontSize) {
			this.width = width;
			this.fontSize = fontSize;

			setTimeout(() => {
				this.$scope.$apply();
			}, 200);
		}
	}

}


module.exports = {
	controller: [ '$element', '$scope', '$ngRedux', PageCanvasController ],
	controllerAs: 'vm',
	template: require('./page-canvas.html').default
}
