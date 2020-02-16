<script>
import { fly, fade } from 'svelte/transition'
import Animation from '../animations'
import Item from '../Components/Item.svelte'

export let data, options, sluggify
</script>

<!-- TODO: lots of repetition in this file -->

<div in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" id="missiles" class="category">
	<h2>
		<img class="icon" src="../../../icons/missile.png" alt="">
		Missiles: {data.collectedMissiles.length}/{data.missiles.length}
		</h2>
	<ul>
		{#each data.missiles as item, index}
			<li class:collapsed="{options.hideChecked && item.checked}">
				<input type="checkbox" id="missile-{index + 1}" bind:checked={item.checked}>
				<label for="missile-{index + 1}">
					{item.area}
					{#if !options.hideLocations}
						<div class="location" transition:fly="{ Animation.listItem.enterLeave }">
							{item.location}
						</div>
					{/if}
				</label>
			</li>
		{/each}
	</ul>
</div>

<div in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" id="eTanks" class="category">
	<h2>
		<img class="icon" src="../../../icons/energy-tank.png" alt="" />
		Energy Tanks: {data.collectedETanks.length}/{data.eTanks.length}
	</h2>
	<ul>
		{#each data.eTanks as item, index}

			<li class:collapsed="{options.hideChecked && item.checked}">
				<input type="checkbox" id="etank-{index + 1}" bind:checked={item.checked}>
				<label for="etank-{index + 1}">
					{item.area}
					{#if !options.hideLocations}
						<div class="location" transition:fly="{ Animation.listItem.enterLeave }">
							{item.location}
						</div>
					{/if}
				</label>
			</li>
		{/each}
	</ul>
</div>

<div in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" id="superMissiles" class="category">
	<h2>
		<img class="icon" src="../../../icons/super-missile.png" alt="" />
		Super Missiles: {data.collectedSuperMissiles.length}/{data.superMissiles.length}
	</h2>
	<ul>
		{#each data.superMissiles as item, index}
			<li class:collapsed="{options.hideChecked && item.checked}">
				<input type="checkbox" id="super_missile-{index + 1}" bind:checked={item.checked}>
				<label for="super_missile-{index + 1}">
					{item.area}
					<div class="location" class:collapsed="{options.hideLocations}">
						{item.location}
					</div>
				</label>
			</li>
		{/each}
	</ul>
</div>

<div in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" id="powerBombs" class="category">
	<h2>
		<img class="icon" src="../../../icons/power-bomb.png" alt="" />
		Power Bombs: {data.collectedPowerBombs.length}/{data.powerBombs.length}
	</h2>
	<ul>
		{#each data.powerBombs as item, index}
			<li class:collapsed="{options.hideChecked && item.checked}">
				<input type="checkbox" id="power_bomb-{index + 1}" bind:checked={item.checked}>
				<label for="power_bomb-{index + 1}">
					{item.area}
					<div class="location" class:collapsed="{options.hideLocations}">
						{item.location}
					</div>
				</label>
			</li>
		{/each}
	</ul>
</div>

<div in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" id="powerUps" class="category">
	<h2>
		<img class="icon" src="../../../icons/ice-beam.png" alt="" />
		Power-Ups: {data.collectedPowerUps.length}/{data.powerUps.length}
	</h2>
	<ul>
		{#each data.powerUps as item, index}
			<li class:collapsed="{options.hideChecked && item.checked}">
				<input type="checkbox" id="upgrade-{index + 1}" bind:checked={item.checked}>
				<label for="upgrade-{index + 1}">
					<img class="icon" src={`../../icons/${sluggify(item.name)}.png`} alt="" />
					{item.name}
				</label>
			</li>
		{/each}
	</ul>
</div>

<div in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" id="reserveTanks" class="category">
	<h2>
		<img class="icon" src="../../../icons/reserve-tank.png" alt="" />
		Reserve Tanks: {data.collectedReserveTanks.length}/{data.reserveTanks.length}
	</h2>
	<ul>
		{#each data.reserveTanks as item, index}
			<li class:collapsed="{options.hideChecked && item.checked}">
				<input type="checkbox" id="reserve_tank-{index + 1}" bind:checked={item.checked}>
				<label for="reserve_tank-{index + 1}">
					{item.area}
					<div class="location" class:collapsed="{options.hideLocations}">
						{item.location}
					</div>
				</label>
			</li>
		{/each}
	</ul>
</div>


<style>
	#missiles {
		grid-row: span 3;
	}
</style>
