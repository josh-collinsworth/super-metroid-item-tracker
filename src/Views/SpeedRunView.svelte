<script>
import { fly, fade } from 'svelte/transition'
import Animation from '../animations'
import Item from '../Components/Item.svelte'
import { sluggify } from '../helpers.js'

export let data, options
</script>

<ol in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" class="category">
	<h2>Speed Run Order</h2>
	{#each data.orderedItems as item, index}
		<Item bind:item  {options} {index} />
	{/each}
</ol>
