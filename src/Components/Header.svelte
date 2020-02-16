<script>
	export let percentage, toggleMenu, isMenuOpen, isScrolling

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

	<button bind:this={menubutton} class:sticky="{isScrolling}" on:click={toggleMenu} aria-pressed={isMenuOpen} role="button">Options</button>
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

	button {
		transition: all .2s ease-in-out;
	}
	.sticky {
		position: fixed;
		animation: slideMenuButtonDown .3s ease-out forwards;
		right: 1em;
		z-index: 10;
	}

	@keyframes slideMenuButtonDown {
		0% {
			top: -5em;
		}

		100% {
			top: 1em;
		}
	}
</style>
