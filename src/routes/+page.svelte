<script>
	import { getAge, groupByParty } from '$lib/util/candidates';

	export let data;

	data.kandidaten.forEach(kandidaat => {
		// console.log(getAge(kandidaat.date_of_birth))
	});

	const parties = groupByParty(data.kandidaten);

	Object.entries(parties).forEach(party => {
		// console.log(`${party[0]}: ${party[1].length}`);
	});

</script>

<svelte:head>
	<title>Op wie kan ik stemmen?</title>
	<meta name="description" content="Op wie kan in stemmen? TK2023">
</svelte:head>

<main>
	<section>
		<h1>Op wie kan ik stemmen?</h1>
		<p class="tagline">Vind het antwoord op één simpele vraag: op wie kan ik stemmen bij de verkiezingen?</p>
	</section>
	<section>
		<ul>
			<li>
				<a href="/kandidaten">
					<h2>Kandidaten</h2>
					<span>Bekijk en filter de kandidaten</span>
				</a>
			</li>
			<li>
				<a href="/partijen">
					<h2>Partijen</h2>
					<span>Bekijk partijlijsten</span>
				</a>
			</li>
		</ul>
	</section>

</main>

<style lang="scss">
	main {
		margin-top: 4rem;
		min-height: 100%;
		padding: 0 var(--base-padding) 1em;

		@media (min-width: 1200px) {
			align-items: center;
			display: flex;
			justify-content: space-between;
		}
	}

	h1 {
		flex-grow: 0;
		line-height: 1;
		margin: 0;
		width: 7.5ch;
		margin-bottom: .75em;

		@media (min-width: 1200px) {
			margin-right: .5em;
			margin-bottom: .2rem;
		}
	}

	.tagline {
		font-size: 1.45em;
		line-height: 1.1;
		margin: 1.5em 0;
		max-width: 44ch;
	}

	h2 {
		margin: 0 0 .5em;

		&::after {
			content: "\2192";
			display: block;
			float: right;
			transition: all 100ms ease-out;
		}
	}

	a {
		background: rgb(var(--background));
		border-radius: .5em;
		box-shadow: 0px 5px 20px rgba(var(--foreground), 0.15);
		color: rgb(var(--foreground));
		display: block;
		margin-bottom: 1em;
		padding: 1em;
		transition: all 100ms ease-out;
		text-decoration: none;

		&:hover,
		&:focus {
			box-shadow: 0px 5px 25px rgba(var(--foreground), 0.2);
			text-decoration: underline;
			transform: translateY(-.15em);

			& > h2::after {
				transform: translateX(.25em);
			}
		}

		@media (min-width: 768px) {
			padding: 2em;
			padding-right: 4em;
		}

	}

</style>
