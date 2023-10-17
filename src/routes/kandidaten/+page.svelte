<script>
	import { getAge, groupByParty } from '$lib/util/candidates';
	import { meta } from '$lib/stores/meta';

	export let data;

	console.log($meta);

</script>

<svelte:head>
	<title>Op wie kan ik stemmen? | Kandidaten</title>
	<meta name="description" content="Op wie kan in stemmen? TK2023" />
</svelte:head>

<section>
	<h1>Kandidaten</h1>

	<p>Filter de {$meta.kandidaten ? $meta.kandidaten : ''} kandidaten van de {$meta.partijen} politieke partijen op kenmerken die jij belangrijk vindt.</p>
	<ul>
		{#each data.kandidaten as kandidaat}
			<li>
				({kandidaat.verkiezingen.tk2023.lijstnummer}) {kandidaat.naam}, {kandidaat.verkiezingen.tk2023.partij_naam}
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	ul {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}

	li {
		padding: 1em;
	}
</style>
