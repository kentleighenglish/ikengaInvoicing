const { cloneDeep, findIndex, reduce, set, get } = require('lodash');
const { updateTemplate } = require('actions/templates');

require('./sidebar.scss');

class SidebarController {

	constructor($scope, $ngRedux) {
		this.$scope = $scope;
		$ngRedux.connect(this.mapStateToThis, dispatch => this.mapDispatchToThis(dispatch, this))(this);

		this.tabs = {
			company: 'business',
			invoice: 'inbox',
			items: 'list',
			charges: 'credit_card'
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

		this.items = [0];

		this.fields = reduce({
			company: [
				{
					key: "details.company.name",
					label: "Company Name",
					type: "text"
				},
				{
					key: "details.company.address",
					label: "Company Address",
					type: "textarea"
				},
				{
					key: "details.company.email",
					label: "Company Email",
					type: "text"
				},
				{
					key: "details.companyBank.name",
					label: "Bank Name",
					type: "text"
				},
				{
					key: "details.companyBank.accName",
					label: "Bank Account Name",
					type: "text"
				},
				{
					key: "details.companyBank.accNumber",
					label: "Bank Account Number",
					type: "text"
				},
				{
					key: "details.companyBank.sortCode",
					label: "Bank Account Sort Code",
					type: "text",
					breakAfter: true
				},
				{
					key: "colours.primary",
					label: "Primary Colour",
					type: "color"
				},
				{
					key: "colours.secondary",
					label: "Secondary Colour",
					type: "color"
				}
			],
			invoice: [
				{
					key: "details.recipient.name",
					label: "Recipient Name",
					type: "text"
				},
				{
					key: "details.recipient.address",
					label: "Recipient Address",
					type: "textarea"
				}
			],
			items: [
				{
					key: "details.project",
					label: "Project Name",
					fogbugz: false,
					type: "text",
					breakAfter: true,
					fogbugzField: {
						key: "fogbugz.selectedProject",
						label: "Project",
						type: "select",
						options: () => this.projects.map((p, i) => ({
							label: p.name,
							value: p.id
						}))
					}
				},
				{
					key: "fogbugz.dateFrom",
					label: "Timeshet From",
					type: "date",
					fogbugz: true
				},
				{
					key: "fogbugz.dateTo",
					label: "Timesheet To",
					type: "date",
					fogbugz: true
				},
				...reduce(this.template.lineItems, (arr, lineItem, i) => ([
					...arr,
					{
						key: `lineItems[${i}].label`,
						label: `Line Item ${i+1} Label`,
						type: "text",
						fogbugz: false,
					},
					{
						key: `lineItems[${i}].quantity`,
						label: `Line Item ${i+1} Quantity`,
						type: "number",
						fogbugz: false,
					},
					{
						key: `lineItems[${i}].unitPrice`,
						label: `Line Item ${i+1} Unit Price`,
						type: "number",
						fogbugz: false,
						breakAfter: true,
						buttons: (this.template.lineItems.length === (i+1)) ? [
						] : null
					}
				]), [])
			],
			charges: [
				{
					key: "fogbugz.hourlyRate",
					label: "Hourly Rate",
					type: "number"
				},
				{
					key: "fogbugz.dailyRate",
					label: "Daily Rate",
					type: "number"
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
