const { useFogbugzToggle } = require('actions/fogbugz');

require('./sidebar.scss');

class SidebarController {

	constructor($scope, $ngRedux) {
		$ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
	}

	mapStateToThis({ fogbugz: fb, projects, canvas }) {
		return {
			fb,
			projects: fb.projects,
			colours: canvas.colours,
			selectedProject: fb.projects[fb.selectedProject]
		}
	}

	mapDispatchToThis(dispatch) {
		return {
			useFogbugzToggle: (value) => dispatch(useFogbugzToggle(value))
		}
	}

}

module.exports = {
	controller: [ '$scope', '$ngRedux', SidebarController ],
	controllerAs: 'vm',
	template: require('./sidebar.html').default
}
