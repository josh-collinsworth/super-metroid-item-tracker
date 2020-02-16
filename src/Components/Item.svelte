<script>
	export let item, sluggify, options
</script>


<li class:collapsed="{options.hideChecked && item.checked}">
	<input type="checkbox" id="item-{item.order}" bind:checked={item.checked}>
	<label for="item-{item.order}">
		{#if options.sorting != 'item'}
			<img class="icon" src={`../../icons/${sluggify(item.name)}.png`} alt="">
		{/if}
		<strong>{item.name}</strong>
		{#if item.location}
			<div class="location" class:collapsed="{options.hideLocations}">
				{item.location}
			</div>
		{/if}
	</label>
</li>
