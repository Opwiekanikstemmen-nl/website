<script>
	import { getAge, groupByParty } from '$lib/util/candidates';

	export let data;

	data.kandidaten.forEach(kandidaat => {
		console.log(getAge(kandidaat.date_of_birth))
	});

	const parties = groupByParty(data.kandidaten);

	Object.entries(parties).forEach(party => {
		console.log(`${party[0]}: ${party[1].length}`);
	});

</script>

<svelte:head>
	<title>Op wie kan ik stemmen?</title>
	<meta name="description" content="Op wie kan in stemmen? TK2023">
</svelte:head>

<main>
	<section>
		<h1>Op wie kan ik stemmen?</h1>
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

	<!-- <ul>
		{#each Object.entries(parties) as party}
			<li>
				{party[0]}: {party[1].length}
			</li>
		{/each}
	</ul>

	<br />

	<ul>
		{#each data.kandidaten as kandidaat}
			<li>
				{kandidaat.name}, {`${getAge(kandidaat.date_of_birth)} jaar oud`}
			</li>
		{/each}
	</ul> -->

</main>

<style lang="scss">
	main {
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
		font-size: min(15vw, 7em);
		line-height: 1;
		margin-top: 6rem;
		width: 7.5ch;
		margin-bottom: .75em;

		@media (min-width: 1200px) {
			margin-right: .5em;
			margin-bottom: .2rem;
		}
	}

	h2 {
		margin-bottom: .5em;
	}

	a {
		display: flex;
		flex-flow: column nowrap;
		position: relative;

		padding: .5em;
		padding-right: 1em;

		background: rgb(var(--background));
		border-radius: .5em;
		box-shadow: 0px 5px 20px rgba(var(--foreground), 0.15);
		color: rgb(var(--foreground));
		font-family: inherit;
		margin-bottom: 1em;
		transition: all 100ms ease-out;

		&::after {
			content: "\2192";
			display: block;
			position: absolute;
			right: 1.5em;
			top: 50%;
			transform: translateY(-50%);
			transition: all 100ms ease-out;

		}

		&:hover,
		&:focus {

			&::after {
				right: 1em;
			}
		}

		@media (min-width: 768px) {
			padding: 1em;
			padding-right: 3em;
		}

	}

</style>
