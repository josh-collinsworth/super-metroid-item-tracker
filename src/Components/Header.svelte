<script>
	export let percentage, toggleMenu, isMenuOpen

	let menubutton

	const handleMenuButttonClick = () => {
		toggleMenu();
	}
</script>


<header id="header" class="category">

	<div class="header-info">
		<h1 class="visually-hidden">Super Metroid Item Tracker</h1>
		<img src="../super-metroid-logo.png" alt="">
		<p aria-hidden="true">Item tracker</p>
		<h2>Total: {percentage}%</h2>
	</div>

	<button bind:this={menubutton} on:click={toggleMenu} aria-pressed={isMenuOpen} role="button">Options</button>
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
