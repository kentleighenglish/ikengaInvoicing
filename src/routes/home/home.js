const { cloneDeep } = require('lodash');

require('./home.scss');

class HomeController {

	constructor($scope, anime) {
		this.$scope = $scope;
		this.anime = anime;
	}

	$onInit() {
		this.amount = 10;

		this.animation = [];
		for(let i = 0; i < this.amount; i++) {
			const r =  250 + (i * 50);
			this.animation.push({
				opacity: 30,
				scale: 1
			});
		}

		var prop = {
			opacity: 30,
			scale: 1
		}

		this.updateCircles();

		this.anime({
			target: prop,
			opacity: 100,
			scale: 10,
			autoplay: true,
			loop: true,
			duration: 3000,
			direction: 'alternate',
			easing: 'easeInOutExpo',
			delay: this.anime.stagger(300, { easing: 'easeInOutExpo' }),
			update: function() {
				console.log(prop);
				// this.updateCircles();
			}
		});
	}

	updateCircles() {
		this.circles = this.animation.map((item, index) => {
			const r =  250 + (index * 50);

			return {
				...item,
				style: {
					width: `${r}px`,
					height: `${r}px`,
					marginLeft: `calc(50% - ${r/2}px)`,
					marginTop: `calc(50% - ${r/2}px)`
				}
			};
		});
	}

}

module.exports = [ '$scope', 'anime', HomeController ];
