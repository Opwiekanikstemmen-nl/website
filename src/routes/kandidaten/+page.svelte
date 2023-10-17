<script>
	import { getAge, groupByParty } from '$lib/util/candidates';

	export let data;

	// data.kandidaten.forEach(kandidaat => {
	// 	console.log(getAge(kandidaat.date_of_birth))
	// });

	// const parties = groupByParty(data.kandidaten);

	// Object.entries(parties).forEach(party => {
	// 	console.log(`${party[0]}: ${party[1].length}`);
	// });
</script>

<svelte:head>
	<title>Op wie kan ik stemmen? | Kandidaten</title>
	<meta name="description" content="Op wie kan in stemmen? TK2023" />
</svelte:head>

<section>
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
</style>
