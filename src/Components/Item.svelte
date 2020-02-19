<script>
	import { sluggify } from '../helpers.js'
	export let item, options
</script>


<li class:collapsed="{options.hideChecked && item.checked}">
	<input type="checkbox" id="item-{item.order}" bind:checked={item.checked} tabindex={options.hideChecked && item.checked ? '-1' : '1'}>
	<label for="item-{item.order}">
		{#if options.sorting != 'item'}
			<img class="icon" src={`../../icons/${sluggify(item.name)}.png`} alt="">
		{/if}
		<strong>
			{item.name}
		</strong>
		<div class="location" class:collapsed="{options.hideLocations}">
			{item.location}
		</div>
	</label>
</li>
