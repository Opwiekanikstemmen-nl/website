<script>
	export let data;

	import { slugify, groupByParty } from '$lib/util/candidates';

	const parties = groupByParty(data.kandidaten);

	Object.entries(parties).forEach(party => {
		console.log(`${party[0]}: ${party[1].length}`);
	});

</script>

<svelte:head>
	<title>Op wie kan ik stemmen? | Partijen</title>
	<meta name="description" content="Op wie kan in stemmen? TK2023" />
</svelte:head>

<section>
	<h1>Partijen</h1>
	<p>De kandidatenlijsten zoals ook te zien op jouw stembiljet.</p>
		<section id="list">
			{#each Object.entries(parties) as party}
			<div>
				<h2>{party[0]}</h2>
				<ol>
					{#each party[1] as candidate}
						<li><a href="{`/kandidaat/${slugify(candidate.name)}`}">{candidate.name}</a></li>
					{/each}
				</ol>
			</div>
		{/each}
	</section>
</section>

<style lang="scss">

	section:not(#list) {
		max-width: 100vw;
		overflow-x: auto;
		padding: calc(var(--base-padding) / 2) var(--base-padding) 0;
	}

	#list {
		display: flex;
		flex-flow: row nowrap;
		margin-top: 2em;
	}

	div {
		display: flex;
		flex-flow: column nowrap;
		background: rgb(var(--background));
		border-radius: .5em;
		box-shadow: 0 0 10px rgba(var(--foreground), 0.15);
		flex-shrink: 0;
		height: calc(82.5vh - 4em - 8vw);
		margin-right: 1em;
		overflow: hidden;
		padding: 1em 1em 0;
		width: 15em;

		@media (prefers-color-scheme: dark) {
			box-shadow: none;
		}
	}

	h2 {
		border-bottom: .1em solid rgb(var(--foreground));
		margin: 0;
		padding-bottom: .33em;
	}

	p {
		margin-top: 1em;
	}

	ol {
		margin-top: .5em;
		list-style-type: decimal;
		padding-left: 1em;
	}

	li {
		list-style-type: decimal;
		margin-bottom: .5em;
	}

</style>
