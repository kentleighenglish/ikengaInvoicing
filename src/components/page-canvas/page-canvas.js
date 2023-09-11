const { cloneDeep, find } = require('lodash');
const moment = require('moment');

require('./page-canvas.scss');

const getHoursWorked = item => (Math.round(item.end.diff(item.start, 'hours', true) * 100) / 100);

const calculateLineItems = (items, mode) => {
	let output = [];
	const formattedItems = items.reduce((arr, item) => ([
		...arr,
		{
			...item,
			start: moment(item.start),
			end: moment(item.end)
		}
	]), []);

	const totalStart = formattedItems.reduce((out, i) => (!out || i.start.isBefore(out)) ? moment(i.start) : out, null);
	const totalEnd = formattedItems.reduce((out, i) => {
		if (!out || i.end.isAfter(out)) {
			return moment(i.end);
		}
		return out;
	}, null);

	if (!totalStart || !totalEnd) {
		return [];
	}

	switch (mode) {
		case 'title':
			return Object.values(formattedItems.reduce((obj, item) => {
				const time = getHoursWorked(item);
				if (!obj[item.title]) {
					obj[item.title] = {
						label: item.title,
						quantity: 1,
						timeWorked: time
					};
				} else {
					obj[item.title] = {
						...obj[item.title],
						timeWorked: obj[item.title].timeWorked + time
					}
				}
				return obj;
			}, {}));
		break;
		case 'week':
			const weekCount = Math.ceil(totalEnd.diff(totalStart.startOf('isoWeek'), 'weeks', true));
			for (let i = 0; i < weekCount; i++) {
				const currentWeek = moment(totalStart).add(i, 'weeks');
				output.push({
					label: `Week Commencing - ${currentWeek.startOf('isoWeek').format('DD/MM/YYYY')}`,
					quantity: 1,
					timeWorked: Math.round(formattedItems.reduce((count, item) => {
						if (item.start.isSame(currentWeek, 'isoWeek')) {
							const time = getHoursWorked(item);

							count = count + time;
						};
						return count;
					}, 0) * 100) / 100
				});
			}

			return output;
		break;
		case 'day':
			const dayCount = Math.ceil(totalEnd.diff(totalStart.startOf('day'), 'days', true));
			for (let i = 0; i < dayCount; i++) {
				const currentDay = moment(totalStart).add(i, 'days');
				const timeWorked = Math.round(formattedItems.reduce((count, item) => {
					if (item.start.isSame(currentDay, 'day')) {
						const time = getHoursWorked(item);

						count = count + time;
					};
					return count;
				}, 0) * 100) / 100;

				if (timeWorked > 0) {
					output.push({
						label: `${currentDay.format('DD/MM/YYYY')}`,
						quantity: 1,
						timeWorked
					});
				}
			}

			return output;
		break;
	}

	return [];
}

const hoursToPay = (hours, { hourlyRate, dailyRate, dayHours, useDailyRate }) => {
	if (useDailyRate) {
		const days = hours / dayHours;

		return dailyRate * days;
	} else {
		return hours * hourlyRate;
	}
}

class PageCanvasController {

	constructor($element, $scope, $ngRedux) {
		this.$scope = $scope;

		this.aspect = .707070;

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

	mapStateToThis({ fogbugz: { projects, items }, templates: { templates, currentTemplate } }) {
		const template = templates[currentTemplate];

		let lineItems = [];
		if (template['fogbugz']['useFogbugz']) {
			lineItems = calculateLineItems(items, template.fogbugz.listMode);

			lineItems = lineItems.map(item => ({
				...item,
				unitPrice: hoursToPay(item.timeWorked, template.fogbugz),
				totalPrice: hoursToPay(item.timeWorked, template.fogbugz) * item.quantity
			}));
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
