<script>
	// export let data;

	import { page } from '$app/stores';

	import { getAge, slugify } from '$lib/util/candidates';

	const kandidaat = $page.data.kandidaten.find(kandidaat => kandidaat.naam === $page.params.slug);
	const verkiezing = kandidaat.verkiezingen.tk2023;
</script>

<svelte:head>
	<title>Op wie kan ik stemmen? | {kandidaat.naam || 'Niet gevonden'}</title>
	<meta name="description" content="Op wie kan in stemmen? TK2023" />
</svelte:head>

<main>
	{#if kandidaat}
		<h1>{kandidaat.naam}</h1>

		<ul class="properties">
			<li>
				Partij: <strong>{verkiezing.partij_naam}</strong>, op plaats {verkiezing.lijstnummer}
			</li>
			<li>
				Woonplaats: <strong>{verkiezing.woonplaats}</strong>
			</li>
			{#if kandidaat.geboortedatum}
			<li>
				Leeftijd: <strong>{getAge(kandidaat.geboortedatum)}</strong>
			</li>
			{:else if kandidaat.leeftijd}
			<li>
				Leeftijd: <strong>{kandidaat.leeftijd}</strong>
			</li>
			{/if}
		</ul>

		<section class="kieskringen">
			<h2>Kieskringen</h2>
			{#if verkiezing.kieskringen.length == 20}
				<p>Verkiesbaar in alle kieskringen.</p>
			{:else}
				<p>Verkiesbaar in {verkiezing.kieskringen.length} van de 20 kieskringen:</p>
				<ul>
					{#each verkiezing.kieskringen as kieskring}
						<li>{kieskring}</li>
					{/each}
				</ul>
			{/if}
		</section>
	{:else}
		<p>Kan kandidaat niet vinden</p>
	{/if}
</main>

<style lang="scss">

</style>
