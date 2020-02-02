<script>
export let data
export let options
export let itemName
import { fly, fade } from 'svelte/transition'
import Animation from '../animations'
</script>

<!-- TODO: lots of repetition in this file -->
{#each data.locations as location, index}
	<div in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" id="eTanks" class="category">
		<h2>{location} {data.itemsByLocation.filter(item => (item.area === location && item.checked)).length}/{data.itemsByLocation.filter(item => item.area === location).length}</h2>
			<ul>
			{#each data.itemsByLocation.filter(item => item.area === location) as item, index}
				{#if !options.hideChecked || !item.checked }
					<li transition:fly="{Animation.listItem.enterLeave}">
						<input type="checkbox" id="${location}-{index + 1}" bind:checked={item.checked}>
						<label for="${location}-{index + 1}">
							<strong>{itemName(item)}</strong>
							{#if !options.hideLocations && item.location}
								<div class="location"  transition:fly="{Animation.listItem.enterLeave}">{item.location}</div>
							{/if}
						</label>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
{/each}
