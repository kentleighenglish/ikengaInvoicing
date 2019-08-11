const { cloneDeep, findIndex, reduce, set, get } = require('lodash');
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
	}

	mapStateToThis({ fogbugz: { projects }, router: { toParams: { tab = 'details' } }, templates: { templates, currentTemplate } }) {
		const template = templates[currentTemplate];

		return {
			projects,
			currentTab: tab,
			currentTemplate: template
		}
	}

	mapDispatchToThis(dispatch, props) {
		return {
			updateTemplate: data => dispatch(updateTemplate(data))
		}
	}

	$onInit() {
		this.template = cloneDeep(this.currentTemplate);

		this.fields = reduce({
			details: [
				{
					key: "details.companyName",
					label: "Company Name",
					type: "text"
				},
				{
					key: "details.project",
					label: "Project Name",
					fogbugz: false,
					type: "text",
					fogbugzField: {
						key: "fogbugz.selectedProject",
						label: "Project",
						type: "select",
						options: () => this.projects.map((p, i) => ({
							label: p.name,
							value: p.id
						}))
					}
				}
			]
		}, (obj, fields, group) => ({
			...obj,
			[group]: fields.reduce((arr, field) => ([
				...arr,
				{
					...field,
					value: get(this.template, field.key),
					fogbugzField: field.fogbugzField ? {
						...field.fogbugzField,
						value: get(this.template, field.fogbugzField.key)
					} : null
				}
			]), [])
		}), {});
	}

	updateField({ key, value }) {
		this.updateTemplate(set({}, key, value));
	}

}

module.exports = {
	controller: [ '$scope', '$ngRedux', SidebarController ],
	controllerAs: 'vm',
	template: require('./sidebar.html').default
}
