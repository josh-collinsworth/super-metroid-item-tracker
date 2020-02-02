<script>
export let data
export let options
import { fly, fade } from 'svelte/transition'
import Animation from '../animations'
</script>

<!-- TODO: lots of repetition in this file -->

<div in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" id="eTanks" class="category">
	<h3>Energy Tanks: {data.collectedETanks.length}/{data.eTanks.length}</h3>
	<ul>
		{#each data.eTanks as item, index}
			{#if !options.hideChecked || !item.checked }
			<li transition:fly="{Animation.listItem.enterLeave}">
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
			{/if}
		{/each}
	</ul>
</div>

<div in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" id="missiles" class="category">
	<h3>Missiles: {data.collectedMissiles.length}/{data.missiles.length}</h3>
	<ul>
		{#each data.missiles as item, index}
		{#if !options.hideChecked || !item.checked }
			<li transition:fly="{Animation.listItem.enterLeave}">
				<input type="checkbox" id="missile-{index + 1}" bind:checked={item.checked}>
				<label for="missile-{index + 1}">
					{item.area}
					{#if !options.hideLocations}
						<div class="location" transition:fly="{Animation.listItem.enterLeave}">
							{item.location}
						</div>
					{/if}
				</label>
			</li>
			{/if}
		{/each}
	</ul>
</div>

<div in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" id="reserveTanks" class="category">
	<h3>Reserve Tanks: {data.collectedReserveTanks.length}/{data.reserveTanks.length}</h3>
	<ul>
		{#each data.reserveTanks as item, index}
		{#if !options.hideChecked || !item.checked }
			<li transition:fly="{Animation.listItem.enterLeave}">
				<input type="checkbox" id="reserve_tank-{index + 1}" bind:checked={item.checked}>
				<label for="reserve_tank-{index + 1}">
					{item.area}
					{#if !options.hideLocations}
						<div class="location" transition:fly="{Animation.listItem.enterLeave}">
							{item.location}
						</div>
					{/if}
				</label>
			</li>
			{/if}
		{/each}
	</ul>
</div>

<div in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" id="superMissiles" class="category">
	<h3>Super Missiles: {data.collectedSuperMissiles.length}/{data.superMissiles.length}</h3>
	<ul>
		{#each data.superMissiles as item, index}
		{#if !options.hideChecked || !item.checked }
			<li transition:fly="{Animation.listItem.enterLeave}">
				<input type="checkbox" id="super_missile-{index + 1}" bind:checked={item.checked}>
				<label for="super_missile-{index + 1}">
					{item.area}
					{#if !options.hideLocations}
						<div class="location" transition:fly="{Animation.listItem.enterLeave}">
							{item.location}
						</div>
					{/if}
				</label>
			</li>
			{/if}
		{/each}
	</ul>
</div>

<div in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" id="powerBombs" class="category">
	<h3>Power Bombs: {data.collectedPowerBombs.length}/{data.powerBombs.length}</h3>
	<ul>
		{#each data.powerBombs as item, index}
		{#if !options.hideChecked || !item.checked }
			<li transition:fly="{Animation.listItem.enterLeave}">
				<input type="checkbox" id="power_bomb-{index + 1}" bind:checked={item.checked}>
				<label for="power_bomb-{index + 1}">
					{item.area}
					{#if !options.hideLocations}
						<div class="location" transition:fly="{Animation.listItem.enterLeave}">
							{item.location}
						</div>
					{/if}
				</label>
			</li>
			{/if}
		{/each}
	</ul>
</div>

<div in:fly="{ Animation.list.enter }" out:fly="{ Animation.list.leave }" id="powerUps" class="category">
	<h3>Power-Ups: {data.collectedPowerUps.length}/{data.powerUps.length}</h3>
	<ul>
		{#each data.powerUps as item, index}
		{#if !options.hideChecked || !item.checked }
			<li transition:fly="{Animation.listItem.enterLeave}">
				<input type="checkbox" id="upgrade-{index + 1}" bind:checked={item.checked}>
				<label for="upgrade-{index + 1}">{item.type || ''}</label>
			</li>
			{/if}
		{/each}
	</ul>
</div>
