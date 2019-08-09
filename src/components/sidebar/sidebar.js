const { useFogbugzToggle } = require('actions/fogbugz');

require('./sidebar.scss');

class SidebarController {

	constructor($scope, $ngRedux) {
		$ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);

		this.tabs = {
			design: 'format_paint',
			details: 'assignment',
			items: 'insert_chart',
			charges: 'attach_money'
		}
	}

	mapStateToThis({ fogbugz: fb, projects, canvas, router: { toParams: { tab = 'details' } } }) {
		return {
			fb,
			projects: fb.projects,
			colours: canvas.colours,
			selectedProject: fb.projects[fb.selectedProject],
			currentTab: tab
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
