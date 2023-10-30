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
		<p>
			Lijstnummer: {partij.lijstnummers['2023']}
		</p>
		<p>
			<a href="{partij.urls.partijwebsite}" class="card">Partijwebsite</a>
		</p>
		<h2>Kandidatenlijst</h2>
		{#if ['BBB', 'GroenLinks - PvdA', 'Forum voor Democratie'].includes(partij.simpele_naam)}
		<p>ℹ️ Sommige partijen laten hun lijst verschillen per kieskring. Daardoor kunnen meerdere kandidaten hetzelfde lijstnummer hebben.</p>
		{/if}
		<ol class="kandidaten">
			{#each kandidaten[partij['naam']] as kandidaat, i}
				<li data-lijstnummer="{kandidaat.verkiezingen.tk2023.lijstnummer}">
					<a href="{`/kandidaat/${kandidaat.id}`}">{kandidaat.naam}</a>
					{#if kandidaat.verkiezingen.tk2023.lijstnummer !== i + 1}
						<span class="lijstnummer">(lijstnummer {kandidaat.verkiezingen.tk2023.lijstnummer})</span>
					{/if}
				</li>
			{/each}
		</ol>
	{:else}
		<p>Kan kandidaat niet vinden</p>
	{/if}
</main>

<style lang="scss">
	p {
		margin: 2em 0;
		max-width: 52ch;
	}

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

		&:has(span) {
			list-style-type: disc;
			margin-left: -.8em;
		}
	}

	.lijstnummer {
		opacity: .8;
	}
</style>

