import { cubicIn, cubicOut, cubicInOut } from 'svelte/easing'

const Animation = {
	list: {
		enter: {
			y: 20, duration: 350, easing: cubicOut, delay: 350
		},
		leave: {
			y: 20, duration: 350, easing: cubicIn
		}
	},
	listItem: {
		enterLeave: {
			y:10, duration: 350, easing: cubicInOut
		}
	}
}

export default Animation
