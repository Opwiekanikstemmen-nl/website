<script>
	import { page } from '$app/stores';
</script>

<header class={$page.url.pathname === '/' ? 'home' : ''}>
	<a href="/" title="Op wie kan ik stemmen?" class="logo">
		<span class="icon">Home</span>
		{#if $page.url.pathname !== '/'}
			<span class="title">Op wie kan ik stemmen?</span>
		{/if}
	</a>
	<nav>
		<ul>
			<li>
				<a href="/partners">Partners</a>
			</li>
			<li>
				<a href="/kandidaten">Kandidaten</a>
			</li>
			<li>
				<a href="https://opwiekanikstemmen.nl/over">Over</a>
			</li>
		</ul>
	</nav>
</header>

<style lang="scss">

	header {
		align-items: start;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
		padding: 4.5vw var(--base-padding) 2em;
		width: 100%;

		&.home {
			padding-top: var(--base-padding);
		}

		@media (min-width: 600px) {
			align-items: center;
			flex-flow: row nowrap;
		}
	}

	.logo {
		display: flex;
		text-decoration: none;
	}

	.icon {
		align-self: center;
		align-items: center;
		cursor: pointer;
		display: flex;
		height: 100%;
		justify-content: center;
		max-height: 3em;
		max-width: 3em;
		min-height: 1em;
		min-width: 1em;
		position: relative;
		width: 100%;

		&::after {
			background: rgb(var(--background));
			border-radius: 50%;
			content: "";
			padding-bottom: calc((100% / 3) * 2);
			position: absolute;
			width: calc((100% / 3) * 2);
		}

		&::before {
			background: rgb(var(--foreground));
			content: "";
			padding-bottom: 100%;
			position: absolute;
			width: 100%;
		}
	}

	.title {
		color: rgb(var(--foreground));
		display: block;
		font-size: 1.1em;
		line-height: 1;
		margin: .1em .75em;
		text-decoration: none;
		width: 7ch;

		@media (min-width: 600px) {
			font-size: 1.375em;
			width: 10ch;
		}
	}
	
	nav ul {
		display: flex;
		flex-flow: row nowrap;
		gap: 1.5em;

		& > li {
			padding: 1em 0;
		}
	}

	header > a {
		display: flex;
		align-items: center;
		gap: .5em;
		text-decoration: none;
	}


</style>