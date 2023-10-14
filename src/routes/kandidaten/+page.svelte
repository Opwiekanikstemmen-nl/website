<script>
	import { getAge, groupByParty } from '$lib/util/candidates';

	export let data;

	data.kandidaten.forEach(kandidaat => {
		console.log(getAge(kandidaat.date_of_birth))
	});

	const parties = groupByParty(data.kandidaten);

	Object.entries(parties).forEach(party => {
		console.log(`${party[0]}: ${party[1].length}`);
	});
</script>

<svelte:head>
	<title>Op wie kan ik stemmen? | Kandidaten</title>
	<meta name="description" content="Op wie kan in stemmen? TK2023" />
</svelte:head>

<section>
	<ul>
		{#each data.kandidaten as kandidaat}
			<li>
				{kandidaat.name}, {`${getAge(kandidaat.date_of_birth)} jaar oud`}
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">

</style>
