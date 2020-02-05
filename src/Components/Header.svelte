<script>
	export let percentage
	export let toggleMenu
	export let menubutton
</script>


<header id="header" class="category">

	<div class="header-info">
		<h1 class="visually-hidden">Super Metroid Item Tracker</h1>
		<img src="../super-metroid-logo.png" alt="">
		<p aria-hidden="true">Item tracker</p>
		<h2>Total: {percentage}%</h2>
	</div>
	<!-- <h1>Super Metroid Item Tracker <i><small>(“Smitty”)</small></i></h1> -->

	<button bind:this={menubutton} on:click={toggleMenu} aria-pressed="false" role="button">Options</button>
</header>


<style>
	.header-info {
		text-align: center;
	}
	.header-info  p {
		margin: 0;
		text-align: center;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		grid-column: 1 / -1;
	}

	header h2 {
		top: unset;
	}
</style>
