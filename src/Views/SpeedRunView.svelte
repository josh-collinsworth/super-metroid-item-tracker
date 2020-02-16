<script>
import { fly, fade } from 'svelte/transition'
import Animation from '../animations'
import Item from '../Components/Item.svelte'

export let data, options, sluggify
</script>

<ol in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" class="category">
	<h2>Speed Run Order</h2>
	{#each data.orderedItems as item}
		<Item bind:item  {options} {sluggify} />
	{/each}
</ol>
