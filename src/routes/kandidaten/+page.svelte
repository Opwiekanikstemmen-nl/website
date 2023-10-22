<script>
	import { meta } from '$lib/stores/meta';

	export let data;

</script>

<svelte:head>
	<title>Op wie kan ik stemmen? | Kandidaten</title>
	<meta name="description" content="Op wie kan in stemmen? TK2023" />
</svelte:head>

<main>
	<h1>Kandidaten</h1>

	<p>Filter de {$meta.kandidaten ? $meta.kandidaten : ''} kandidaten van de {$meta.partijen} politieke partijen op kenmerken die jij belangrijk vindt.</p>
	<ul>
		{#each data.kandidaten as kandidaat}
			<li>
				<a href="{`/kandidaat/${kandidaat.naam}`}">{kandidaat.naam}</a>
			</li>
		{/each}
	</ul>
</main>

<style lang="scss">
	ul {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}

	li {
		padding: 1em;
	}
</style>
