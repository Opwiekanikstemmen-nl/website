<script>
	import { meta } from '$lib/stores/meta';

	import { sortReversedAlphabetically } from '$lib/util/candidates';

	export let data;

	const sortedCandidates = sortReversedAlphabetically(data.kandidaten);

</script>

<svelte:head>
	<title>Kandidaten - Op wie kan ik stemmen?</title>
	<meta name="description" content="De complete lijst met alle kandidaten in alle kieskringen.">
</svelte:head>

<main>
	<h1>Kandidaten</h1>

	<p>Filter de {$meta.kandidaten ? $meta.kandidaten : ''} kandidaten van de {$meta.partijen} politieke partijen op kenmerken die jij belangrijk vindt.</p>
	<ul>
		{#each sortedCandidates as kandidaat}
			<li>
				<a href="{`/kandidaat/${kandidaat.naam}`}">{kandidaat.naam}</a>
			</li>
		{/each}
	</ul>
</main>

<style lang="scss">
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(17em, 1fr));
		margin: 1em 0;
		gap: 1em;
	}
</style>
