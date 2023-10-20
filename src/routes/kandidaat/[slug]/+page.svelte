<script>
	// export let data;

	import { page } from '$app/stores';

	import { getAge, slugify } from '$lib/util/candidates';

	const kandidaat = $page.data.kandidaten.find(kandidaat => kandidaat.naam === $page.params.slug);
</script>

<svelte:head>
	<title>Op wie kan ik stemmen? | {kandidaat.name || 'Niet gevonden'}</title>
	<meta name="description" content="Op wie kan in stemmen? TK2023" />
</svelte:head>

<main>
	{#if kandidaat}
		<p>Naam: {kandidaat.name}</p>
		<p>Partij: {kandidaat.party}</p>
		<p>Woonplaats: {kandidaat.current_living_place}</p>
		<p>Leeftijd: {getAge(kandidaat.date_of_birth)}</p>
	{:else}
		<p>Kan kandidaat niet vinden</p>
	{/if}
</main>

<style lang="scss">

</style>
