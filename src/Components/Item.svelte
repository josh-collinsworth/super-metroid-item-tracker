<script>
	import { sluggify } from '../helpers.js'
	export let item, options
</script>


<li class:collapsed="{options.hideChecked && item.checked}">
	<input type="checkbox" id="item-{item.order}" bind:checked={item.checked} tabindex={options.hideChecked && item.checked ? '-1' : '1'}>
	<label for="item-{item.order}">
		<img class="icon" src={`../../icons/${sluggify(item.name)}.png`} alt="">
		<strong class:checked={item.checked} style="display: flex">
			{item.name}
			<svg viewBox="0 0 110 110">
				<polyline points="25,75 50,100 100,50"></polyline>
			</svg>
		</strong>
		<div class="location" class:collapsed="{options.hideLocations}">
			{item.location}
		</div>
	</label>
</li>

<style>
	strong {
		transition: opacity .15s;
	}

	li:hover strong {
		opacity: 1;
	}

	svg {
		width: 1em;
		height: 1em;
	}

	polyline {
		transform-origin: center;
		stroke-width: 1em;
		stroke: white;
		fill: transparent;
		stroke-opacity: 1;
		stroke-linecap: butt;
		stroke-linejoin: miter;
		stroke-dasharray: 8em;
		stroke-dashoffset: 8em;
		transition: stroke-dashoffset .2s ease-in-out;
	}

	.checked polyline {
		stroke-dashoffset: 0em;
	}
</style>