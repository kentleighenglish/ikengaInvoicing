const { cloneDeep } = require('lodash');

class HomeController {

	constructor($scope) {
		this.$scope = $scope;
	}

	$onInit() {
	}

}

module.exports = [ '$scope', HomeController ];
