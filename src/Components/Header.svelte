<script>
	export let percentage, toggleMenu, isMenuOpen, isScrolling

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

	<button class:sticky="{isScrolling}" on:click={toggleMenu} aria-pressed={isMenuOpen} role="button">Options</button>
	<button id="secondary-menu-button" class:sticky="{isScrolling}" on:click={toggleMenu} aria-hidden="true" role="button">Options</button>
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
		margin-top: 0;
	}

	header h2 {
		top: unset;
	}

	button {
		transition: all .2s ease-in-out;
	}

	#secondary-menu-button {
		position: fixed;
		right: 1em;
		top: -5em;
		z-index: 10;
		transition: top .2s ease-in-out;
	}

	#secondary-menu-button.sticky {
		top: 1em;
	}
</style>
