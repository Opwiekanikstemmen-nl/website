<script>
	import { page } from '$app/stores';

	import { groupByParty } from '$lib/util/candidates';

	const partij = $page.data.partijen.find(partij => partij.simpele_naam === $page.params.slug);
	const kandidaten = groupByParty($page.data.kandidaten);
</script>

<svelte:head>
	<title>{partij.naam || 'Niet gevonden'} - Op wie kan ik stemmen?</title>
	<meta name="description" content="{`Wat wij weten over ${partij.naam}` || 'Deze partij is niet gevonden'}">
</svelte:head>

<main>
	{#if partij}
		<h1>{partij.naam}</h1>
		<a href="{partij.urls.partijwebsite}" class="card">Partijwebsite</a>
		<h2>Kandidatenlijst</h2>
		<ol class="kandidaten">
			{#each kandidaten[partij['naam']] as kandidaat}
				<li><a href="{`/kandidaat/${kandidaat.id}`}">{kandidaat.naam}</a></li>
			{/each}
		</ol>
	{:else}
		<p>Kan kandidaat niet vinden</p>
	{/if}
</main>

<style lang="scss">
	.kandidaten {
		@media (min-width: 50em) {
			column-count: 2;
		}
		@media (min-width: 90em) {
			column-count: 3;
		}
		@media (min-width: 130em) {
			column-count: 4;
		}
	}
	
	li {
		margin-bottom: .5em;
	}
</style>

