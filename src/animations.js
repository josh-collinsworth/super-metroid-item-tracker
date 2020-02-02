import { quintIn, quintOut, quintInOut } from 'svelte/easing'

const Animation = {
	list: {
		enter: {
			y: 20, duration: 350, easing: quintOut, delay: 350
		},
		leave: {
			y: 20, duration: 350, easing: quintIn
		}
	},
	listItem: {
		enterLeave: {
			y:10, duration: 350, easing: quintInOut
		}
	}
}

export default Animation
