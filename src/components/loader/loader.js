const anime = require('animejs').default;

class LoaderController {

	constructor($scope) {
		this.$scope = $scope;
	}

	$onInit() {
		this.amount = 10;

		this.animation = [];
		for(let i = 0; i < this.amount; i++) {
			const r =  250 + (i * 50);
			this.animation.push({
				opacity: .3,
				scale: 1
			});
		}

		anime({
			targets: this.animation,
			autoplay: true,
			loop: true,
			delay: anime.stagger(400, { easing: 'linear' }),
			keyframes: [
				{ scale: 1.2, opacity: 1, duration: 3000, easing: 'easeInOutExpo' },
				{ scale: 1, opacity: .3, duration: 2000, easing: 'easeInOutExpo' },
			],
			update: (el) => {
				this.updateCircles();
				this.$scope.$apply();
			}
		});

		this.updateCircles();
	}

	updateCircles() {
		this.circles = this.animation.map((item, index) => {
			const r =  50 + (index * 50);

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

module.exports = {
	controllerAs: 'vm',
	controller: [ '$scope', '$timeout', LoaderController ],
	template: require('./loader.html').default
}
