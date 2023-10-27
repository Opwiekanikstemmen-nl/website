<script>
	export let data;

	import { groupByParty } from '$lib/util/candidates';

	const parties = groupByParty(data.kandidaten);
	const partijen = data.partijen.sort((a, b) => a['lijstnummers']['2023'] > b['lijstnummers']['2023']);

</script>

<svelte:head>
	<title>Partijen - Op wie kan ik stemmen?</title>
	<meta name="description" content="Het stembiljet, maar dan digitaal: alle kandidaten van alle partijen">
</svelte:head>

<main>
	<h1>Partijen</h1>
	<ol class="partijnamen card">
		{#each partijen as party}
			<li>
				<a href="/partij/{party['simpele_naam']}">{party['simpele_naam']}</a>
			</li>
		{/each}
	</ol>
	<h2>De kandidatenlijsten</h2>
	<p>Zoals ze ook te zien zijn op jouw stembiljet.</p>
	<section id="ballot-list">
		{#each partijen as party}
			<article>
				<h3>{party['naam']}</h3>
				<ol>
					{#each parties[party['naam']] as kandidaat}
						<li><a href="{`/kandidaat/${kandidaat.id}`}">{kandidaat.naam}</a></li>
					{/each}
				</ol>
			</article>
		{/each}
	</section>
</main>

<style lang="scss">

	.partijnamen {
		padding: 2em 2em 2em 4em;

		@media (min-width: 46em) {
			column-count: 2;
		}
		@media (min-width: 65em) {
			column-count: 3;
		}
		@media (min-width: 110em) {
			column-count: 4;
		}
		@media (min-width: 160em) {
			column-count: 6;
		}

		& li {
			break-inside: avoid-column;
			margin-bottom: .75em;
			padding-right: 2em;
		}
	}

	#ballot-list {
		max-width: 100vw;
		overflow-x: auto;
		display: flex;
		flex-flow: row nowrap;
		margin-top: 2em;
		padding: 0 var(--base-padding) var(--base-padding);
		margin: 2em calc(-1 * var(--base-padding)) calc(-1 * var(--base-padding)) ;
	}

	article {
		display: flex;
		flex-flow: column nowrap;
		background: rgb(var(--background));
		border-radius: .5em;
		box-shadow: 0 0 10px rgba(var(--foreground), 0.15);
		flex-shrink: 0;
		height: max(calc(82.5vh), 15em);
		margin-right: 1em;
		overflow: hidden;
		padding: 1em 1em 0;
		width: 15em;

		@media (prefers-color-scheme: dark) {
			box-shadow: none;
		}
	}

	h3 {
		border-bottom: .05em solid rgb(var(--foreground));
		margin: 0;
		padding-bottom: .33em;
	}

	p {
		margin-top: 1em;
	}

	ol {
		margin: 0;
		padding: 1em 0 1em 2em;
		overflow: auto;
	}

	li {
		margin-bottom: .5em;
	}

</style>
