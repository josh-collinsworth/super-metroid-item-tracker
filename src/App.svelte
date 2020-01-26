<script>
import { afterUpdate } from 'svelte'
import { fly, fade } from 'svelte/transition'
import { quintIn, quintOut, quintInOut } from 'svelte/easing'
import { defaultList } from './defaultList.js'

export let initializeList = () => {
	if (!localStorage.getItem('superMetroidItemChecklist')) {
		localStorage.setItem('superMetroidItemChecklist', JSON.stringify(defaultList))
	}
	return JSON.parse(localStorage.getItem('superMetroidItemChecklist'))
}

export let initializeOptions = () => {
	if (!localStorage.getItem('superMetroidItemChecklistOptions')) {
		localStorage.setItem('superMetroidItemChecklistOptions', JSON.stringify({ sorting: 'item', hideChecked: false }))
	}
	return JSON.parse(localStorage.getItem('superMetroidItemChecklistOptions'))
}

export let items = initializeList();
export let options = initializeOptions();
export let isMenuOpen = false;
export let menubutton;


afterUpdate(() => {
	localStorage.setItem('superMetroidItemChecklist', JSON.stringify(items))
	localStorage.setItem('superMetroidItemChecklistOptions', JSON.stringify(options))
	console.log(options.hideChecked)
});

const itemName = (item) => {
	return item.type === "Powerup" ? item.subtype : item.type
}

const resetList = () => {
	const confirmation = confirm(`Are you sure you want to completely reset the list and all items to zero?`);
	if (confirmation) items = [...defaultList];
}

const viewByItem = () => {
	return options.sorting === "item" ? null : 'hidden';
}

const toggleMenu = () => {
	isMenuOpen = !isMenuOpen;
	menubutton.setAttribute('aria-pressed', !isMenuOpen);
}


$: orderedItems = items.sort((a, b) => a.order - b.order);

$: percentage = items.filter(item => item.checked).length

$: missiles = items.filter(item => item.subtype === "Missile")
$: eTanks = items.filter(item => item.subtype === "Energy Tank")
$: reserveTanks = items.filter(item => item.subtype === "Reserve Tank")
$: superMissiles = items.filter(item => item.subtype === "Super Missile")
$: powerBombs = items.filter(item => item.subtype === "Power Bomb")
$: powerUps = items.filter(item => item.subtype === "Upgrade")

$: collectedMissiles = missiles.filter(item => item.checked)
$: collectedETanks = eTanks.filter(item => item.checked)
$: remainingETanks = eTanks.filter(item => !item.checked)
$: collectedReserveTanks = reserveTanks.filter(item => item.checked)
$: collectedSuperMissiles = superMissiles.filter(item => item.checked)
$: collectedPowerBombs = powerBombs.filter(item => item.checked)
$: collectedPowerUps = powerUps.filter(item => item.checked)

</script>

<!-- TODO: break this out into multiple components 😬 -->
<main>
	<header id="header" class="category">

	<h1>Super Metroid Item Tracker <i><small>(“Smitty”)</small></i></h1>
		<h2>Total: {percentage}%</h2>

		<button bind:this={menubutton} on:click={toggleMenu} aria-pressed="false" role="button">Options</button>
	</header>

	{#if isMenuOpen}
		<aside id="menu" transition:fly="{{x: -400, duration: 400}}">
			<form>
				<button id="close-menu-btn" on:click|preventDefault="{toggleMenu}" role="button" aria-label="close menu">❌</button>
				<fieldset id="viewSwitch">
					<legend>View by:</legend>
					<div class="form-pair">
						<input bind:group={options.sorting} value={'item'} type="radio" id="byType" />
						<label for="byType">Item type</label>
					</div>
					<div class="form-pair">
						<input bind:group={options.sorting} value={'order'} type="radio" id="byOrder" />
						<label for="byOrder">Speed run order</label>
					</div>
				</fieldset>

				<div class="form-pair">
					<input bind:checked={options.hideChecked} type="checkbox" id="hideChecked" />
					<label for="hideChecked">Hide checked items</label>
				</div>

				<button on:click|preventDefault={resetList} role="button">Reset list</button>
			</form>
		</aside>
	{/if}



	{#if options.sorting === "item"}

		<div in:fly="{{ y: 20, duration: 350, easing: quintOut, delay: 350 }}" out:fly="{{ y: 20, duration: 350, easing: quintIn }}" id="eTanks" class="category">
			<h3>Energy Tanks: {collectedETanks.length}/{eTanks.length}</h3>
			<ul>
				{#each eTanks as item, index}
				{#if !options.hideChecked || !item.checked }
					<li transition:fly="{{y:10, duration: 350, easing: quintInOut}}">
						<input type="checkbox" id="etank-{index + 1}" bind:checked={item.checked}>
						<label for="etank-{index + 1}">{item.location || ''}</label>
					</li>
					{/if}
				{/each}
			</ul>
		</div>

		<div in:fly="{{ y: 20, duration: 350, easing: quintOut, delay: 350 }}" out:fly="{{ y: 20, duration: 350, easing: quintIn }}" id="missiles" class="category">
			<h3>Missiles: {collectedMissiles.length}/{missiles.length}</h3>
			<ul>
				{#each missiles as item, index}
				{#if !options.hideChecked || !item.checked }
					<li transition:fly="{{y:10, duration: 350, easing: quintInOut}}">
						<input type="checkbox" id="missile-{index + 1}" bind:checked={item.checked}>
						<label for="missile-{index + 1}">{item.location || ''}</label>
					</li>
					{/if}
				{/each}
			</ul>
		</div>

		<div in:fly="{{ y: 20, duration: 350, easing: quintOut, delay: 350 }}" out:fly="{{ y: 20, duration: 350, easing: quintIn }}" id="reserveTanks" class="category">
			<h3>Reserve Tanks: {collectedReserveTanks.length}/{reserveTanks.length}</h3>
			<ul>
				{#each reserveTanks as item, index}
				{#if !options.hideChecked || !item.checked }
					<li transition:fly="{{y:10, duration: 350, easing: quintInOut}}">
						<input type="checkbox" id="reserve_tank-{index + 1}" bind:checked={item.checked}>
						<label for="reserve_tank-{index + 1}">{item.location || ''}</label>
					</li>
					{/if}
				{/each}
			</ul>
		</div>

		<div in:fly="{{ y: 20, duration: 350, easing: quintOut, delay: 350 }}" out:fly="{{ y: 20, duration: 350, easing: quintIn }}" id="superMissiles" class="category">
			<h3>Super Missiles: {collectedSuperMissiles.length}/{superMissiles.length}</h3>
			<ul>
				{#each superMissiles as item, index}
				{#if !options.hideChecked || !item.checked }
					<li transition:fly="{{y:10, duration: 350, easing: quintInOut}}">
						<input type="checkbox" id="super_missile-{index + 1}" bind:checked={item.checked}>
						<label for="super_missile-{index + 1}">{item.location || ''}</label>
					</li>
					{/if}
				{/each}
			</ul>
		</div>

		<div in:fly="{{ y: 20, duration: 350, easing: quintOut, delay: 350 }}" out:fly="{{ y: 20, duration: 350, easing: quintIn }}" id="powerBombs" class="category">
			<h3>Power Bombs: {collectedPowerBombs.length}/{powerBombs.length}</h3>
			<ul>
				{#each powerBombs as item, index}
				{#if !options.hideChecked || !item.checked }
					<li transition:fly="{{y:10, duration: 350, easing: quintInOut}}">
						<input type="checkbox" id="power_bomb-{index + 1}" bind:checked={item.checked}>
						<label for="power_bomb-{index + 1}">{item.location || ''}</label>
					</li>
					{/if}
				{/each}
			</ul>
		</div>

		<div in:fly="{{ y: 20, duration: 350, easing: quintOut, delay: 350 }}" out:fly="{{ y: 20, duration: 350, easing: quintIn }}" id="powerUps" class="category">
			<h3>Power-Ups: {collectedPowerUps.length}/{powerUps.length}</h3>
			<ul>
				{#each powerUps as item, index}
				{#if !options.hideChecked || !item.checked }
					<li transition:fly="{{y:10, duration: 350, easing: quintInOut}}">
						<input type="checkbox" id="upgrade-{index + 1}" bind:checked={item.checked}>
						<label for="upgrade-{index + 1}">{item.type || ''}</label>
					</li>
					{/if}
				{/each}
			</ul>
		</div>

	{:else}

		<ol in:fly="{{ y: 20, duration: 350, easing: quintOut, delay: 350 }}" out:fly="{{ y: 20, duration: 350, easing: quintIn }}" class="category">
			<h3>All items</h3>
			{#each orderedItems as item}
				{#if !options.hideChecked || !item.checked }
				<li transition:fly="{{y:10, duration: 350, easing: quintInOut}}">
					<input type="checkbox" id="item-{item.order}" bind:checked={item.checked}>
					<label for="item-{item.order}">
						<strong>{itemName(item)}</strong>
						&ensp;|&ensp;
						{item.location || ''}
					</label>
				</li>
				{/if}
			{/each}
		</ol>

	{/if}

</main>

<footer>
	<p>This site ©2020 <a href="https://joshcollinsworth.com" target="_blank">Josh Collinsworth</a>. Built with <a href="https://svelte.dev/" target="_blank">Svelte</a> and hosted on <a href="https://netlify.com/" target="_blank">Netlify</a>.</p>
	<p>Item locations and order taken from <a href="https://wiki.supermetroid.run/100%25" target="_blank">wiki.supermetroid.run</a></p>
	<p>Super Metroid ©1994 Nintendo, which is not affiliated with this site.</p>
</footer>

<style>
	main {
		padding: 0 0 8em;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		grid-gap: 1rem;
	}

	h1 {
		grid-column: span 2;
		line-height: 1;
	}

	h1 small {
		font-size: .5em;
	}

	h3 {
		font-size: 1.6rem;
	}

	header {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		justify-items: start;
		align-items: center;
		grid-column: 1 / -1;
	}

	header h1,
	header h2 {
		grid-column: 1 / 4;
	}

	header button {
		grid-row: 1 / 3;
		display: block;
		justify-self: end;
	}

	header button {
		grid-column: 5 / 6;
	}

	li {
		margin: 0 0 .25em;
	}

	#itemTypeSection, #orderSection {
		display: inherit;
		grid-template-columns: inherit;
		grid-gap: inherit;
	}

	.category {
		border: none;
		border-radius: .5em;
		padding: 2rem;
		background: rgba(1, 0, 27, .6);
	}

	.category label {
		font-weight: normal;
	}

	#etank-hud {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		max-width: 5rem;
	}

	label {
		font-weight: bold;
	}

	ol.category {
		padding-left: 3rem;
		grid-column: 1 / -1;
	}

	#menu {
		position: fixed;
		top: 0;
		left: 0;
		min-height: 100vh;
		padding: 2rem;
		width: 100vw;
		max-width: 36rem;
		background: rgba(0,0,0,.9);
		z-index: 10;
		box-sizing: border-box;
	}

	#close-menu-btn {
		position: absolute;
		right: 1rem;
		top: 1rem;
		background: transparent;
		border: none;
	}

	#menu form > * + * {
		margin-top: 2rem;
	}

	footer {
		font-size: .8rem;
		padding: 2em;
		text-align: center;
	}

	footer p {
		margin: 0;
	}

	footer p:last-of-type {
		margin-top: 1em;
	}

	@media (min-width: 36rem) {
		main {
			padding: 2em 2em 8em;
		}

		.category {
			padding: 1em;
			border: 2px solid;
		}
	}

	@media (min-width: 70rem) {
		ol.category {
			column-count: 2;
			column-gap: 4rem;
		}
	}

	@media (min-width: 110rem) {
		ol.category {
			column-count: 3;
		}
	}
</style>
