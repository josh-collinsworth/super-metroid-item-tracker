<script>
	export let percentage
	export let toggleMenu
	export let menubutton
</script>


<header id="header" class="category">

	<h1>Super Metroid Item Tracker <i><small>(“Smitty”)</small></i></h1>
	<h2>Total: {percentage}%</h2>

	<button bind:this={menubutton} on:click={toggleMenu} aria-pressed="false" role="button">Options</button>
</header>


<style>
	h1 {
		grid-column: span 2;
		line-height: 1;
		font-size: 2rem;
	}

	h1 small {
		font-size: .5em;
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
</style>
