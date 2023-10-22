<script>
	export let data;

	import { groupByParty } from '$lib/util/candidates';

	const parties = groupByParty(data.kandidaten);

	// Object.entries(parties).forEach(party => {
	// 	console.log(`${party[0]}: ${party[1].length}`);
	// });

</script>

<svelte:head>
	<title>Partijen - Op wie kan ik stemmen?</title>
	<meta name="description" content="Het stembiljet, maar dan digitaal: alle kandidaten van alle partijen">
</svelte:head>

<main>
	<h1>Partijen</h1>
	<p>De kandidatenlijsten zoals ook te zien op jouw stembiljet.</p>
	<section id="list">
		{#each Object.entries(parties) as party}
			<div>
				<h2>{party[0]}</h2>
				<ol>
					{#each party[1] as candidate}
						<li><a href="{`/kandidaat/${candidate.naam}`}">{candidate.naam}</a></li>
					{/each}
				</ol>
			</div>
		{/each}
	</section>
</main>

<style lang="scss">

	#list {
		max-width: 100vw;
		overflow-x: auto;
		display: flex;
		flex-flow: row nowrap;
		margin-top: 2em;
		padding: 0 var(--base-padding) var(--base-padding);
		margin: 2em calc(-1 * var(--base-padding)) calc(-1 * var(--base-padding)) ;
	}

	div {
		display: flex;
		flex-flow: column nowrap;
		background: rgb(var(--background));
		border-radius: .5em;
		box-shadow: 0 0 10px rgba(var(--foreground), 0.15);
		flex-shrink: 0;
		height: calc(82.5vh - 4em - 8vw);
		margin-right: 1em;
		overflow: hidden;
		padding: 1em 1em 0;
		width: 15em;

		@media (prefers-color-scheme: dark) {
			box-shadow: none;
		}
	}

	h2 {
		border-bottom: .05em solid rgb(var(--foreground));
		margin: 0;
		padding-bottom: .33em;
	}

	p {
		margin-top: 1em;
	}

	ol {
		margin: 0;
		list-style-type: decimal;
		padding: 1em 0 1em 2em;
		overflow: auto;
	}

	li {
		list-style-type: decimal;
		margin-bottom: .5em;
	}

</style>
