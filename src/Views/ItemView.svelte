<script>
import { fly, fade } from 'svelte/transition'
import Animation from '../animations'
import Item from '../Components/Item.svelte'
import { sluggify } from '../helpers.js'

export let data, options

$: allItems = [
	{
		name: "Missile",
		all: data.missiles,
		collected: data.collectedMissiles
	}, {
		name: "Energy Tank",
		all: data.eTanks,
		collected: data.collectedETanks
	}, {
		name: "Super Missile",
		all: data.superMissiles,
		collected: data.collectedSuperMissiles
	}, {
		name: "Power Bomb",
		all: data.powerBombs,
		collected: data.collectedPowerBombs
	}, {
		name: "Reserve Tank",
		all: data.reserveTanks,
		collected: data.collectedReserveTanks
	}, {
		name: "Power-Up",
		all: data.powerUps,
		collected: data.collectedPowerUps
	}
]
</script>


{#each allItems as type}
	<div
		in:fly="{ Animation.list.enter }"
		out:fly="{ Animation.list.leave }"
		id={sluggify(type.name)}
		class="category"
		style="{options.hideChecked ? `grid-row: span ${type.all.length - type.collected.length};` : `grid-row: span ${type.all.length};`}"
	>
		<h2>
			<img class="icon" src="{`../../../icons/${sluggify(type.name)}.png`}" alt="">
			{type.name}s: {type.collected.length}/{type.all.length}
		</h2>
		<ul>
			{#each type.all as item, index}
				<Item bind:item {options} {index}/>
			{/each}
		</ul>
	</div>
{/each}

