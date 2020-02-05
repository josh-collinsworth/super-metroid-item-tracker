<script>
export let data, options, itemName, sluggify
import { fly, fade } from 'svelte/transition'
import Animation from '../animations'
</script>

<!-- TODO: lots of repetition in this file -->
{#each data.locations as location, index}
	<div in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" class="category">
		<h2>{location} {data.itemsByLocation.filter(item => (item.area === location && item.checked)).length}/{data.itemsByLocation.filter(item => item.area === location).length}</h2>
			<ul>
			{#each data.itemsByLocation.filter(item => item.area === location) as item, index}
				<li class:collapsed="{options.hideChecked && item.checked}">
					<input type="checkbox" id="${location}-{index + 1}" bind:checked={item.checked}>
					<label for="${location}-{index + 1}">
						<!-- <strong>
						{itemName(item)}
						</strong> -->
						<img class="icon" src={`../../icons/${sluggify(itemName(item))}.png`} alt="" />
						{#if item.location}
							<div class="location" class:collapsed="{options.hideLocations}">{item.location}</div>
						{/if}
					</label>
				</li>
			{/each}
		</ul>
	</div>
{/each}

<style>
	label {
		width: 100%;
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
	}
	.icon {
		transition: opacity .2s;
		width: 1.8em;
		opacity: .6;
		display: inline-block;
	}

	input:checked + label .icon {
		opacity: 1;
	}

	.location {
		width: 100%;
	}
</style>
