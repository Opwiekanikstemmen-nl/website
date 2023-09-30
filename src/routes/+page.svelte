<script>
	import Header from '$lib/components/Header.svelte';

	import { getAge } from '$lib/util/age';

	/** @type {import('./$types').LayoutData} */
	export let data;

	data.kandidaten.forEach(kandidaat => {
		console.log(getAge(kandidaat.date_of_birth))
	});

</script>

<svelte:head>
	<title>Op wie kan ik stemmen?</title>
	<meta name="description" content="Op wie kan in stemmen? TK2023" />
</svelte:head>

<main>
	<ul>
		{#each data.kandidaten as kandidaat}
			<li>
				{kandidaat.name}, {`${getAge(kandidaat.date_of_birth)} jaar oud`}
			</li>
		{/each}
		{#each data.kandidaten as kandidaat}
			<li>
				{kandidaat.name}, {`${getAge(kandidaat.date_of_birth)} jaar oud`}
			</li>
		{/each}
		{#each data.kandidaten as kandidaat}
			<li>
				{kandidaat.name}, {`${getAge(kandidaat.date_of_birth)} jaar oud`}
			</li>
		{/each}
		{#each data.kandidaten as kandidaat}
			<li>
				{kandidaat.name}, {`${getAge(kandidaat.date_of_birth)} jaar oud`}
			</li>
		{/each}
		{#each data.kandidaten as kandidaat}
			<li>
				{kandidaat.name}, {`${getAge(kandidaat.date_of_birth)} jaar oud`}
			</li>
		{/each}
		{#each data.kandidaten as kandidaat}
			<li>
				{kandidaat.name}, {`${getAge(kandidaat.date_of_birth)} jaar oud`}
			</li>
		{/each}
	</ul>

</main>

<style lang="scss">
	main {
		min-height: 100%;
	}
</style>
