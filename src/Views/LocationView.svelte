<script>
import { fly, fade } from 'svelte/transition'
import Animation from '../animations'
import Item from '../Components/Item.svelte'

export let data, options, sluggify
</script>

{#each data.locations as location, index}
	<div in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" class="category">
		<h2>{location} {data.itemsByLocation.filter(item => (item.area === location && item.checked)).length}/{data.itemsByLocation.filter(item => item.area === location).length}</h2>
			<ul>
			{#each data.itemsByLocation.filter(item => item.area === location) as item}
				<Item bind:item {options} {sluggify} />
			{/each}
		</ul>
	</div>
{/each}
