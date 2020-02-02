<script>
	import { fly } from 'svelte/transition'

	export let isMenuOpen
	export let options
	export let resetList
	export let toggleMenu
</script>

{#if isMenuOpen}
		<aside id="menu" transition:fly="{{x: -400, duration: 400}}">
			<form>
				<button id="close-menu-btn" on:click|preventDefault="{toggleMenu}" role="button" aria-label="close menu">❌</button>
				<fieldset id="viewSwitch">
					<legend>View by:</legend>
					<div>
						<input bind:group={options.sorting} value={'order'} type="radio" id="byOrder" />
						<label for="byOrder">Speed run order</label>
					</div>
					<div>
						<input bind:group={options.sorting} value={'item'} type="radio" id="byType" />
						<label for="byType">Item type</label>
					</div>
					<div>
						<input bind:group={options.sorting} value={'location'} type="radio" id="byLocation" />
						<label for="byLocation">Area</label>
					</div>
				</fieldset>

				<hr />

				<div>
					<input bind:checked={options.hideChecked} type="checkbox" id="hideChecked" />
					<label for="hideChecked">Hide checked items</label>
				</div>

				<div>
					<input bind:checked={options.hideLocations} type="checkbox" id="hideLocations" />
					<label for="hideLocations">Hide item location hints</label>
				</div>

				<hr />

				<div>
					<button on:click|preventDefault={resetList} role="button">Reset list</button>
				</div>
			</form>
		</aside>
	{/if}


<style>
	label {
		font-weight: bold;
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

	fieldset {
		padding: 0;
		border: 0;
	}

	legend {
		font-weight: bold;
		font-size: 1.6rem;
	}

	#close-menu-btn {
		position: absolute;
		right: 1rem;
		top: 1rem;
		background: transparent;
		border: none;
	}

	#menu form > div {
		margin-top: .6rem;
	}

	hr {
		margin: 1.5rem 0;
		display: block;
		border: 1px solid;
	}
</style>
