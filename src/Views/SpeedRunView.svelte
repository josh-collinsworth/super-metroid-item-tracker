<script>
export let data, options, itemName
import { fly, fade } from 'svelte/transition'
import Animation from '../animations'
</script>

<ol in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" class="category">
	<h3>All items</h3>
	{#each data.orderedItems as item}
		{#if !options.hideChecked || !item.checked }
			<li transition:fly="{ Animation.listItem.enterLeave }">
				<input type="checkbox" id="item-{item.order}" bind:checked={item.checked}>
				<label for="item-{item.order}">
					<strong>{itemName(item)}</strong>
					{#if item.location && !options.hideLocations}
						<div class="location"  transition:fly="{Animation.listItem.enterLeave}">{item.area} - {item.location || ''}</div>
					{/if}
				</label>
			</li>
		{/if}
	{/each}
</ol>


<style>
	#itemTypeSection, #orderSection {
		display: inherit;
		grid-template-columns: inherit;
		grid-gap: inherit;
	}
</style>
