<script>
	import { meta } from '$lib/stores/meta';
	import { filters } from '$lib/stores/filters';

	import { groupByParty } from '$lib/util/candidates';
	import { applyFilters, sortData } from '$lib/util/filters';

	export let data;

	let parties = groupByParty(data.kandidaten);
	$: kandidaten = sortData(data.kandidaten, 'naam', 'desc');

	filters.subscribe(update => {
		if (update) {
			kandidaten = sortData(applyFilters(data.kandidaten, update), 'naam', 'desc');
		}
	})

</script>

<svelte:head>
	<title>Kandidaten - Op wie kan ik stemmen?</title>
	<meta name="description" content="De complete lijst met alle kandidaten in alle kieskringen.">
</svelte:head>

<main>
	<h1>Kandidaten ({kandidaten.length || '?'})</main>h1>
	<p>Filter de {$meta.kandidaten ? $meta.kandidaten : ''} kandidaten van de {$meta.partijen} politieke partijen op kenmerken die jij belangrijk vindt.</p>

	<section>
		<!-- <aside>
			<ul>
				<li>
					<input bind:value={$filters['naam']} type="text" id='naam' placeholder="Voer naam in" name="naam">
					<label for="naam">Naam</label>
				</li>
				{#each Object.keys(parties) as party}
					<li>
						<input bind:group={$filters['verkiezingen.tk2023.partij_naam']} type="checkbox" id="{slugify(party)}" value="{slugify(party)}" name="{slugify(party)}" />
						<label for="{slugify(party)}">{party}</label>
					</li>
				{/each}
			</ul>
		</aside> -->
		<ul>
			{#each kandidaten as kandidaat}
				<li>
					<a href="{`/kandidaat/${kandidaat.id}`}">{kandidaat.naam}</a>
				</li>
			{/each}
		</ul>
	</section>

</main>

<style lang="scss">
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(17em, 1fr));
		margin: 1em 0;
		gap: 1em;
	}
</style>
