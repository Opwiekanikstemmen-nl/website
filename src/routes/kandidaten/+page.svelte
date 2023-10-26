<script>
	import { meta } from '$lib/stores/meta';
	import { filters } from '$lib/stores/filters';

	import { groupByParty, slugify } from '$lib/util/candidates';
	import { applyFilters, sortData } from '$lib/util/filters';

	export let data;

	let filterMenu;

	let parties = groupByParty(data.kandidaten);
	$: kandidaten = sortData(data.kandidaten, 'naam', 'desc');

	filters.subscribe(update => {
		if (update) {
			console.log(kandidaten);
			kandidaten = sortData(applyFilters(data.kandidaten, update), 'naam', 'desc');
		}
	})

	function changeMenu(event) {
		filterMenu.classList.toggle('is-open');
		event.target.nextElementSibling.toggleAttribute('hidden');
		event.target.setAttribute('aria-expanded', event.target.getAttribute('aria-expanded') === 'false');
	}

</script>

<svelte:head>
	<title>Kandidaten - Op wie kan ik stemmen?</title>
	<meta name="description" content="De complete lijst met alle kandidaten in alle kieskringen.">
</svelte:head>

<main>
	<h1>Kandidaten ({kandidaten.length})</h1>
	<p>Filter de {$meta.kandidaten ? $meta.kandidaten : ''} kandidaten van de {$meta.partijen} politieke partijen op kenmerken die jij belangrijk vindt.</p>

	<section>

		<!-- <aside bind:this={filterMenu}>
			<button on:click={changeMenu} aria-expanded="false" aria-controls="filters">
				<h2>
					<span aria-hidden="true">↑</span>
					Filters
				</h2>
			</button>
			<ul id="filters" hidden>
				<li>
					<details>
						<summary>
							<h3>
								<label for="naam">Naam</label>
							</h3>
						</summary>
						<input bind:value={$filters['naam']} type="text" id='naam' placeholder="Voer naam in" name="naam">
					</details>
				</li>
				<li>
					<details>
						<summary><h3>Partij</h3></summary>
						<ul>
							{#each Object.keys(parties) as party}
								<li>
									<input bind:group={$filters['verkiezingen.tk2023.partij_naam']} type="checkbox" id="{slugify(party)}" value="{slugify(party)}" name="{slugify(party)}" />
									<label for="{slugify(party)}">{party}</label>
								</li>
							{/each}
						</ul>
					</details>
				</li>
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

	aside {
		position: fixed;
		top: 1.5em;
		left: 1.5em;
		right: 1.5em;
		bottom: 0;
		padding: 1em;
		background: rgba(var(--color), 1);

		transform: translateY(calc(100vh - 5em));

		transition: transform .3s ease-in-out;
		box-shadow: 1px 1px 10px rgba(var(--foreground), .25);
		border-top-right-radius: .5em;
		border-top-left-radius: .5em;

		& > h2 {
			margin-top: 0;
		}

		& > ul {
			display: flex;
			flex-flow: column nowrap;
		}

		& button {
			all: unset;
			width: 100%;
			cursor: pointer;
		}

		&.is-open {
			transform: translateY(0);
		}
	}

	summary {
		cursor: pointer;
		margin-bottom: .5em;
	}

	label {
		cursor: pointer;
	}

	h3 label {
		pointer-events: none;
	}

	h3 {
		display: inline-block;
		margin: 0;
		padding-left: .5em;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(17em, 1fr));
		margin: 1em 0;
		gap: 1em;
	}
</style>
