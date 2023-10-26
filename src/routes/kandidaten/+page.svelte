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

		<aside bind:this={filterMenu}>
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
								Naam
							</h3>
						</summary>
						<label for="naam">Naam kandidaat</label>
						<input bind:value={$filters['naam']} type="text" id='naam' name="naam">
					</details>
				</li>
				<li>
					<details>
						<summary><h3>Partij</h3></summary>
						<ul>
							{#each Object.keys(parties) as party}
								<li class="inputWrapper">
									<input bind:group={$filters['verkiezingen.tk2023.partij_naam']} type="checkbox" id="{slugify(party)}" value="{slugify(party)}" name="{slugify(party)}" />
									<label class="option" for="{slugify(party)}">{party}</label>
								</li>
							{/each}
						</ul>
					</details>
				</li>
			</ul>
		</aside>

		<ul class="kandidaten">
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
		background: rgba(var(--background), 1);
		box-shadow: 0 0 1em rgba(var(--foreground), .25);
		border-radius: .5em .5em 0 0;
		position: fixed;
		top: 1.5em;
		left: 1.5em;
		right: 1.5em;
		bottom: 0;
		transform: translateY(calc(100vh - 5em));
		transition: all .25s cubic-bezier(.19,1,.22,1);


		& button {
			padding: 1em;
			width: 100%;
			box-shadow: none;
		}

		& h2 {
			margin: 0;
			pointer-events: none;
		}

		& > ul {
			display: flex;
			flex-flow: column nowrap;
			margin: 0;
			padding: 1em;
		}

		&.is-open {
			transform: translateY(0);

			& button span {
				display: inline-block;
				transform: rotate(180deg);
			}
		}
	}

	details {
		border-bottom: 1px solid rgba(var(--foreground), .5);
		margin: 0 0 .5em;
		padding: .5em 0 1em;
	}

	summary {
		cursor: pointer;
		margin-bottom: 1em;
	}

	label {
		cursor: pointer;
	}

	h3 {
		display: inline-block;
		margin: 0;
		padding-left: .5em;
	}

	.kandidaten {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(17em, 1fr));
		margin: 1em 0;
		gap: 1em;
	}

	.inputWrapper {
		align-items: center;
		display: flex;
		flex-flow: row nowrap;
		max-width: calc(100% - 1em);

		&:focus-within {
			outline: 5px auto Highlight;
			outline: 5px auto -webkit-focus-ring-color;
		}
	}

	label {
		display: block;
		font-size: .9em;
		font-weight: bold;
		margin: 1.2rem 0 -1.7rem .8rem;
		position: relative;
	}

	.option {
		align-items: center;
		display: flex;
		flex-flow: row nowrap;
		font-size: 1em;
		font-weight: 400;
		line-height: 1.2;
		margin: 0;
		padding: .8em 0 .8em 1.5em;
		position: relative;

		&:before {
			border: 2px solid rgba(var(--foreground), .5);
			content: "";
			height: .9em;
			left: 0;
			position: absolute;
			width: .9em;
		}
	}


	input {
		background: rgb(var(--background));
		border-radius: .25em;
		border: .15em solid rgb(var(--foreground));
		box-sizing: border-box;
		color: rgb(var(--foreground));
		font-size: 1em;
		padding: 1.8em .7rem .7rem;
		width: 100%;

		&[type=checkbox] {
			clip-path: inset(50%);
			clip: rect(0 0 0 0);
			display: inline-block;
			height: 1px;
			margin-right: .5em;
			order: -1;
			overflow: hidden;
			position: absolute;
			white-space: nowrap;
			width: 1px;

			&:checked + label:before {
				background: rgba(var(--foreground), 1);
			}
		}
	}
</style>
 