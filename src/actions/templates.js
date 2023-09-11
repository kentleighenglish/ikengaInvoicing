
const actions = {
	UPDATE_TEMPLATE: 'UPDATE_TEMPLATE',
	SET_CURRENT_TEMPLATE: 'SET_CURRENT_TEMPLATE'
}

const useFogbugzToggle = (value) => ({
	type: actions.UPDATE_TEMPLATE,
	payload: {
		template: {
			fogbugz: {
				useFogbugz: value
			}
		}
	}
});

const updateTemplate = (template) => ({
	type: actions.UPDATE_TEMPLATE,
	payload: {
		template
	}
})

const setCurrentTemplate = (id) => ({
	type: actions.SET_CURRENT_TEMPLATE,
	payload: { id }
});

module.exports = {
	actions,
	useFogbugzToggle,
	setCurrentTemplate,
	updateTemplate
}
