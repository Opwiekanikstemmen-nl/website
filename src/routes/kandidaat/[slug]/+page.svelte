<script>
	// export let data;

	import { page } from '$app/stores';

	import slugify from '$lib/util/slug.js'
	import { getAge } from '$lib/util/age.js';

	const kandidaat = $page.data.kandidaten.find(kandidaat => slugify(kandidaat.name) === $page.params.slug)
</script>

<svelte:head>
	<title>Op wie kan ik stemmen?</title>
	<meta name="description" content="Op wie kan in stemmen? TK2023" />
</svelte:head>

<section>
    {#if kandidaat}
		<p>Naam: {kandidaat.name}</p>
		<p>Partij: {kandidaat.party}</p>
		<p>Woonplaats: {kandidaat.current_living_place}</p>
		<p>Leeftijd: {getAge(kandidaat.date_of_birth)}</p>
	{:else}
		<p>Kan kandidaat niet vinden</p>
	{/if}
</section>

<style lang="scss">

</style>
