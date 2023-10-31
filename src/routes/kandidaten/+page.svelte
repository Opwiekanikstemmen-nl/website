<script>
	import { meta } from '$lib/stores/meta';
	import { filters } from '$lib/stores/filters';
	import { user } from '$lib/stores/filters';

	import { groupByParty, slugify, getWoonplaatsen } from '$lib/util/candidates';
	import { applyFilters, sortData } from '$lib/util/filters';

	import Map from '../cijfers/Map.svelte';

	export let data;

	let filterMenu;

	let parties = groupByParty(data.kandidaten);
	let woonplaatsen = getWoonplaatsen(data.kandidaten);
	$: kandidaten = sortData(data.kandidaten, 'naam', 'desc');

	filters.subscribe(update => {
		if (update) {
			kandidaten = sortData(applyFilters(data.kandidaten, update), 'naam', 'desc');
		}
	})

	user.subscribe(update => {
		if (update) {
			if (data.kieskringen[update.stemlocatie]) {
				$filters['verkiezingen.tk2023.kieskringen'] = data.kieskringen[update.stemlocatie];
			}
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
			<h2 class="large">
				Filters
			</h2>
			<ul id="filters" hidden>
				<li>
					<details open>
						<summary>
							<h3>
								Stemlocatie & kieskring
							</h3>
						</summary>
						
						<p>Het stembiljet verschilt per stemlocatie. Kies de gemeente waar je stemt, of kies zelf je kieskring.</p>
						<label for="stemlocatie">Gemeente waar je stemt</label>
						<input bind:value={$user['stemlocatie']} type="text" id="stemlocatie" placeholder="gemeente" name="stemlocatie" list="stemlocatie_opties">
						<datalist id="stemlocatie_opties">
							{#each Object.entries(data.kieskringen) as kieskring}
								<option value="{kieskring[0]}">{kieskring[0]}</option>
							{/each}
						</datalist>

						<label for="kieskring">Kieskring</label>
						<input bind:value={$filters['verkiezingen.tk2023.kieskringen']} type="text" id="kieskring" list="kieskring_opties">
						<datalist id="kieskring_opties">
							{#each $meta.kieskringen as kieskring}
								<option value="{kieskring}">{kieskring}</option>
							{/each}
						</datalist>
					</details>
				</li>
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
							{#each Object.keys(parties).sort() as party}
								<li class="inputWrapper">
									<input bind:group={$filters['verkiezingen.tk2023.partij_naam']} type="checkbox" id="{slugify(party)}" value="{slugify(party)}" name="{slugify(party)}" />
									<label class="option" for="{slugify(party)}">{party}</label>
								</li>
							{/each}
						</ul>
					</details>
				</li>
				<li>
					<details>
						<summary><h3>Geslacht</h3></summary>
						<p>Kandidaten kunnen hun geslacht opgeven op de kandidatenlijst, maar dit hoeft niet. Daarom is het van een deel onbekend.</p>
						<ul>
							{#each [['man', 'm'], ['vrouw', 'v'], ['onbekend', 'o']] as sex}
								<li class="inputWrapper">
									<input bind:group={$filters['geslacht']} type="checkbox" id="{sex[1]}" value="{sex[1]}" name="{sex[1]}">
									<label class="option" for="{sex[1]}">{sex[0]}</label>
								</li>
							{/each}
						</ul>
					</details>
				</li>
				<li>
					<details>
						<summary><h3>Woonplaats</h3></summary>
						<ul>
							{#each woonplaatsen.sort((a, b) => a > b) as woonplaats}
								<li class="inputWrapper">
									<input bind:group={$filters['verkiezingen.tk2023.woonplaats']} type="checkbox" id="{slugify(woonplaats)}" value="{slugify(woonplaats)}" name="{slugify(woonplaats)}">
									<label class="option" for="{slugify(woonplaats)}">{woonplaats}</label>
								</li>
							{/each}
						</ul>
					</details>
				</li>
				<li>
					<details>
						<summary><h3>Stedelijkheid</h3></summary>
						<p>Het CBS deelt gemeentes, en daarmee woonplaatsen, in op <a href="https://www.cbs.nl/nl-nl/nieuws/2023/42/minder-huishoudelijk-afval-per-inwoner-in-2022/stedelijkheid">stedelijkheid</a>.</p>
						<ul>
							{#each $meta.stedelijkheidsNiveaus as level}
							<li class="inputWrapper">
								<input bind:group={$filters['verkiezingen.tk2023.gemeente.stedelijkheid']} type="checkbox" id="{slugify(level)}" value="{slugify(level)}" name="{slugify(level)}">
								<label class="option" for="{slugify(level)}">{level}</label>
							</li>
							{/each}
						</ul>
						<figure>
							<Map />
							<figcaption>De stedelijkheid visueel aangegeven: een fellere kleur betekent stedelijker. CBS heeft een <a href="https://opendata.cbs.nl/#/CBS/nl/dataset/84929NED/table">volledige dataset</a>. Dit kaartje is gebaseerd op <a href="https://commons.wikimedia.org/w/index.php?curid=6632126">werk van JrPol</a> (CC BY-SA 3.0).</figcaption>
						</figure>		
					</details>
				</li>
			</ul>
		</aside>

		<ul class="kandidaten" id="kandidaten">
			{#each kandidaten as kandidaat}
				<li>
					<a href="{`/kandidaat/${kandidaat.id}`}">{kandidaat.naam}</a>
				</li>
			{/each}

			<div class="card counter">
				We vonden {kandidaten.length} {kandidaten.length === 1 ? 'kandidaat' : 'kandidaten'} op basis van je filter.
				<a href="#kandidaten">Scroll omhoog</a>
			</div>
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
		transform: translateY(calc(100dvh - 5em));
		transition: all .25s cubic-bezier(.19,1,.22,1);
		z-index: 2;

		& button {
			box-shadow: none;
			line-height: 1;
			padding: 1em;
			width: 100%;
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

	#filters {
		max-height: calc(100dvh - 1.5em - 3.65em);
		overflow-y: scroll;
	}

	.large {
		display: none;
	}
		
	@media (min-width: 45em) {
		section {
			column-gap: 2em;
			display: grid;
			grid-template-columns: 20em 1fr;
			margin-top: 2em;
			align-items: stretch;
		}

		button {
			display: none;
		}

		aside {
			background: none;
			border-radius: 0;
			border-right: 1px solid rgba(var(--foreground), 1);
			box-shadow: none;
			position: static;
			transform: none;
			padding: 1em 2em 0 0;
		}

		.large {
			display: block;
		}

		#filters {
			padding: 0;
			margin-top: 1em;
			max-height: none;
			overflow-y: visible;
		}

		li:last-child details {
			margin-bottom: 0;
		}
	}

	details {
		border-bottom: 1px solid rgba(var(--foreground), .5);
		margin: 0 0 .5em;
		padding: .5em 0 1em;
	}

	summary {
		cursor: pointer;

		& + * {
			margin-top: .5em;
		}
	}

	h3 {
		display: inline-block;
		margin: 0;
		padding-left: .5em;
	}

	.kandidaten {
		display: grid;
		gap: 1em;
		grid-template-columns: repeat(auto-fill, minmax(17em, 1fr));
		margin: 1em 0;
		grid-template-rows: repeat(auto-fill, 1.5em);
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
		margin: 1.7rem 0 -1.7rem .8rem;
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

		&:nth-of-type(2) {
			background-color: rgba(var(--color));
			border-width: 1px;
		}
	}

	.counter {
		align-self: baseline;
		grid-column: 1/-1;
		min-height: 3.5em;
		position: sticky;
		top: 2em;
		z-index: 1;
	}
</style>
 