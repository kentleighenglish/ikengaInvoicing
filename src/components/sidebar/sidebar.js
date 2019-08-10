const { cloneDeep, findIndex, set, get } = require('lodash');
const { updateTemplate } = require('actions/templates');

require('./sidebar.scss');

class SidebarController {

	constructor($scope, $ngRedux) {
		this.$scope = $scope;
		$ngRedux.connect(this.mapStateToThis, dispatch => this.mapDispatchToThis(dispatch, this))(this);

		this.tabs = {
			design: 'format_paint',
			details: 'assignment',
			items: 'insert_chart',
			charges: 'attach_money'
		}

		this.fields = {
			details: [
				{
					key: 'project',
					placeholder: "Project Name",
					fogbugz: false,
					type: 'text'
				}
			]
		}
	}

	mapStateToThis({ fogbugz: { projects }, router: { toParams: { tab = 'details' } }, templates: { templates, currentTemplate } }) {
		return {
			projects,
			currentTab: tab,
			currentTemplate: templates[currentTemplate]
		}
	}

	mapDispatchToThis(dispatch, props) {
		return {
			updateTemplate: data => dispatch(updateTemplate(data))
		}
	}

	$onInit() {
		this.$scope.$watch(() => this.currentTemplate, () => {
			this.template = cloneDeep(this.currentTemplate);

			this.selectedProject = findIndex(this.projects, { id: this.template.fogbugz.selectedProject });
		}, true);
	}

	changeProject() {
		if (this.projects.length && this.selectedProject !== -1) {
			const selected = this.projects[this.selectedProject];
			this.updateTemplate({ fogbugz: { selectedProject: selected.id } })
		}
	}

	updateField(key, group) {
		const value = get(this.template[group], key);

		this.updateTemplate({
			[group]: set(this.template[group], key, value)
		})
	}

}

module.exports = {
	controller: [ '$scope', '$ngRedux', SidebarController ],
	controllerAs: 'vm',
	template: require('./sidebar.html').default
}
