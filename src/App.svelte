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
let initializeList = () => {
	if (!localStorage.getItem('superMetroidItemChecklist')) {
		//Add a "checked" prop to each item, rather than hard-coding it 100 times.
		const itemList = defaultList.map(item => { return {...item, checked: false }})
		localStorage.setItem('superMetroidItemChecklist', JSON.stringify(itemList))
	}

	const updated = JSON.parse(localStorage.getItem('superMetroidItemChecklist'))
	const areAllUnique = new Set(updated.map(item => item.order))
	if (!updated[0].area || [...areAllUnique].length !== updated.length || !updated[0].unique) {
		alert(`Your saved data is still on an old version of this app. When you're ready, please reset the list from the options menu. Your data will be lost.`)
	}

	return JSON.parse(localStorage.getItem('superMetroidItemChecklist'))
}

let initializeOptions = () => {
	if (!localStorage.getItem('superMetroidItemChecklistOptions')) {
		localStorage.setItem('superMetroidItemChecklistOptions', JSON.stringify({
			sorting: 'item',
			hideChecked: false,
			hideLocations: false
		}))
	}
	return JSON.parse(localStorage.getItem('superMetroidItemChecklistOptions'))
}

let items = initializeList()
let options = initializeOptions()
let isMenuOpen = false
let y = 0
let isScrolling


afterUpdate((a, b) => {
	localStorage.setItem('superMetroidItemChecklist', JSON.stringify(items))
	localStorage.setItem('superMetroidItemChecklistOptions', JSON.stringify(options))
})

const sluggify = (str) => {
	if (!str) return ''
	return str.toLowerCase().replace(' ', '-')
}

const resetList = () => {
	const confirmation = confirm(`Are you sure you want to completely reset the list and all items to zero?`)
	if (confirmation) items = [...defaultList]
}

const viewByItem = () => {
	return options.sorting === "item" ? null : 'hidden'
}

const toggleMenu = () => {
	isMenuOpen = !isMenuOpen
}

const adjustMenuButtonPlacement = (scroll) => {
	isScrolling = scroll > 500 ? true : false
}

$: orderedItems = items.sort((a, b) => a.order - b.order)

$: itemsByLocation = orderedItems.sort((a, b) => a.area - b.area)
$: locations = [...new Set(items.map(item => item.area))]

$: percentage = items.filter(item => item.checked).length

$: missiles = items.filter(item => item.name === "Missile")
$: eTanks = items.filter(item => item.name === "Energy Tank")
$: reserveTanks = items.filter(item => item.name === "Reserve Tank")
$: superMissiles = items.filter(item => item.name === "Super Missile")
$: powerBombs = items.filter(item => item.name === "Power Bomb")
$: powerUps = items.filter(item => item.unique)

$: collectedMissiles = missiles.filter(item => item.checked)
$: collectedETanks = eTanks.filter(item => item.checked)
$: remainingETanks = eTanks.filter(item => !item.checked)
$: collectedReserveTanks = reserveTanks.filter(item => item.checked)
$: collectedSuperMissiles = superMissiles.filter(item => item.checked)
$: collectedPowerBombs = powerBombs.filter(item => item.checked)
$: collectedPowerUps = powerUps.filter(item => item.checked)

$: thing = options;

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
	locations,
}
</script>


<svelte:window bind:scrollY={y} on:scroll={() => {adjustMenuButtonPlacement(y)}}/>


<Header {percentage} {toggleMenu} {isMenuOpen} {isScrolling}/>
<main>
	<Menu bind:options bind:isMenuOpen {toggleMenu} {isMenuOpen} {resetList}/>

	{#if options.sorting === "item"}
		<ItemView bind:data {options} {sluggify} />
	{:else if options.sorting === "order"}
		<SpeedRunView bind:data {options} {sluggify}/>
	{:else}
		<LocationView bind:data {options} {sluggify}/>
	{/if}
</main>

<footer>
	<p>This site ©2020 <a href="https://joshcollinsworth.com" target="_blank">Josh Collinsworth</a>. Built with <a href="https://svelte.dev/" target="_blank">Svelte</a> and hosted on <a href="https://netlify.com/" target="_blank">Netlify</a>.</p>
	<p>Item locations and order taken from <a href="https://wiki.supermetroid.run/100%25" target="_blank">wiki.supermetroid.run</a></p>
	<p>Super Metroid ©1994 Nintendo, which is not affiliated with this site.</p>
</footer>

<style>
	main {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		grid-gap: 1rem;
		grid-auto-flow: dense;
		align-items: start;
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
</style>
