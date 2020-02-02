<script>
import { afterUpdate } from 'svelte'
import { defaultList } from './defaultList.js'

//Views
import ItemView from './Views/ItemView.svelte'
import SpeedRunView from './Views/SpeedRunView.svelte'
import LocationView from './Views/LocationView.svelte'

//Components
import Header from './Components/Header.svelte'
import Menu from './Components/Menu.svelte'

//Initializers
export let initializeList = () => {
	if (!localStorage.getItem('superMetroidItemChecklist')) {
		localStorage.setItem('superMetroidItemChecklist', JSON.stringify(defaultList))
	}
	return JSON.parse(localStorage.getItem('superMetroidItemChecklist'))
}

export let initializeOptions = () => {
	if (!localStorage.getItem('superMetroidItemChecklistOptions')) {
		localStorage.setItem('superMetroidItemChecklistOptions', JSON.stringify({ sorting: 'item', hideChecked: false, hideLocations: false }))
	}
	return JSON.parse(localStorage.getItem('superMetroidItemChecklistOptions'))
}

export let items = initializeList();
export let options = initializeOptions();
export let isMenuOpen = false;


afterUpdate(() => {
	localStorage.setItem('superMetroidItemChecklist', JSON.stringify(items))
	localStorage.setItem('superMetroidItemChecklistOptions', JSON.stringify(options))
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
	setTimeout(() => {
		const menu = document.querySelector('#menu')
		menu.setAttribute('aria-pressed', !isMenuOpen)
	}, 20)
}

$: orderedItems = items.sort((a, b) => a.order - b.order)

$: itemsByLocation = orderedItems.sort((a, b) => a.area - b.area)
$: locations = [...new Set(items.map(item => item.area))]

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

$: data = {
	orderedItems,
	percentage,
	missiles,
	eTanks,
	reserveTanks,
	superMissiles,
	powerBombs,
	powerUps,
	collectedMissiles,
	collectedETanks,
	remainingETanks,
	collectedReserveTanks,
	collectedSuperMissiles,
	collectedPowerBombs,
	collectedPowerUps,
	itemsByLocation,
	locations
}
</script>

<main>

	<Header {percentage} {toggleMenu} />

	<Menu bind:options {isMenuOpen} {toggleMenu} {isMenuOpen} {resetList}/>

	{#if options.sorting === "item"}
		<ItemView bind:data {options} />
	{:else if options.sorting === "order"}
		<SpeedRunView bind:data {options} {itemName} />
	{:else}
		<LocationView bind:data {options} {itemName} />
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
	}
</style>
