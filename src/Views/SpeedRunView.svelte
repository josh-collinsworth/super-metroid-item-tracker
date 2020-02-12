<script>
export let data, options, itemName, sluggify
import { fly, fade } from 'svelte/transition'
import Animation from '../animations'
</script>

<ol in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" class="category">
	<h2>Speed Run Order</h2>
	{#each data.orderedItems as item}
		<li class:collapsed="{options.hideChecked && item.checked}">
			<input type="checkbox" id="item-{item.order}" bind:checked={item.checked}>
			<label for="item-{item.order}">
				<img class="icon" src={`../../icons/${sluggify(itemName(item))}.png`} alt="">
				<strong>{itemName(item)}</strong>
				{#if item.location}
					<div class="location" class:collapsed="{options.hideLocations}">
						{item.area} - {item.location || ''}
					</div>
				{/if}
			</label>
		</li>
	{/each}
</ol>


<style>
	#itemTypeSection, #orderSection {
		display: inherit;
		grid-template-columns: inherit;
		grid-gap: inherit;
	}

	label {
		width: 100%;
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
	}
	.icon {
		transition: opacity .2s;
		width: 1.6em;
		margin-right: .5em;
		opacity: .5;
		display: inline-block;
	}

	input:checked + label .icon {
		opacity: 1;
                filter: saturate (0);
	}

	.location {
		width: 100%;
	}
</style>
