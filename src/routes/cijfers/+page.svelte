<script>
	export let data;

	import { meta } from '$lib/stores/meta';

	import { groupByParty } from '$lib/util/candidates';
	import { sortData } from '$lib/util/filters';
	import { count, countParties, countUnkowns } from '$lib/util/statistics';

	$: kandidaten = sortData(data.kandidaten, 'naam', 'desc');

	const parties = groupByParty(data.kandidaten);
	const woonplaatsen = countUnkowns(data.kandidaten, ['verkiezingen', 'tk2023', 'woonplaats']);
	const partySizes = countParties(parties);

</script>

<svelte:head>
	<title>Cijfers - Op wie kan ik stemmen?</title>
	<meta name="description" content="Cijfers en weetjes over de kandidaten van de Tweede Kamerverkiezing 2023">
</svelte:head>

<main>
	<h1>Cijfers</h1>

	<section class="numbers">
		<article class="card">
			<p class="label">De langste lijst</p>
			<div>
				<h2><span class="number">{partySizes[0][1]}</span> zoveel kandidaten staan er op langste lijst</h2>
				<details>
					<summary>De ‘kleinste’ partij heeft er maar {partySizes.at(-1)[1]}</summary>
					<p>Een partij mag maximaal 80 kandidaten op de lijst zetten per kieskring <a href="https://wetten.overheid.nl/jci1.3:c:BWBR0004627&afdeling=II&hoofdstuk=H&artikel=H_6&z=2023-06-20&g=2023-06-20">volgens de kieswet (artikel H 6)</a>. Sommige partijen zetten lijstduwers op hun kandidatenlijst die verschillen per kieskring. Zo kan een partij het totaal-aantal kandidaten opkrikken.</p>
					<table>
						<caption>
							Het totaal aantal kandidaten per partij
						</caption>
						<thead>
							<tr>
								<th>Aantal</th>
								<th>Partij</th>
							</tr>
						</thead>
						<tbody>
							{#each partySizes as party}
								<tr>
									<td>{party[1]}</td>
									<td>{party[0]}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			</div>
		</article>
		<article class="card">
			<p class="label">Mannen/vrouwen</p>
			<div>
				<h2><span class="number">{Math.round(count(kandidaten, 'geslacht', 'm')/count(kandidaten, 'geslacht', 'v'))}&times;</span> meer mannen dan vrouwen zijn verkiesbaar*</h2>
			<details>
				<summary>Van alle kandidaten zijn er {count(kandidaten, 'geslacht', 'm')} man en {count(kandidaten, 'geslacht', 'v')} vrouw. Van {count(kandidaten, 'geslacht', null)} kandidaten weten we het niet.</summary>
				<p>Dat we het van sommige kandidaten niet weten, komt omdat een aantal partijen geen geslacht doorgeeft bij het inleveren van hun kandidatenlijsten.</p>
				<p>Verder wordt er bij de kandidatenlijsten niet iemands gender opgeschreven. Daardoor weten we dus ook niet of er non-binaire kandidaten op de lijsten staan.</p>
			</details>
			</div>
		</article>
		<article class="card">
			<p class="label">Woonplaatsen</p>
			<div>
				<h2><span class="number">{Math.round(woonplaatsen[0][1]/$meta.kandidaten*100)}%</span> woont in {woonplaatsen[0][0]}</h2>
				<details>
					<summary>Daarna komen <strong>{woonplaatsen[1][0]}</strong> en <strong>{woonplaatsen[2][0]}</strong> als woonplaatsen met de meeste kandidaten.</summary>
					<p>De tien meest vertegenwoordigde woonplaatsen zijn:</p>
					<ol>
						{#each Array(10).fill().map((element, index) => index) as location}
							<li>{woonplaatsen[location][1]} in <strong>{woonplaatsen[location][0]}</strong></li>
						{/each}
					</ol>
				</details>
			</div>
		</article>
		<article class="card">
			<p class="label">Buitenland</p>
			<div>
				<h2><span class="number">9</span> kandidaten wonen niet in Nederland</h2>
				<details>
					<summary>Van Forum voor Democratie, Nieuw Sociaal Contract en BVNL wonen elk twee kandidaten in het buitenland.</summary>
					<p>Het gaat om deze kandidaten:</p>
					<ul>
						{#each kandidaten.filter((kandidaat) => kandidaat['verkiezingen']['tk2023']['woonplaats'].includes('(') && !kandidaat['verkiezingen']['tk2023']['woonplaats'].includes('(O)')) as kandidaat}
							<li><a href="{`/kandidaat/${kandidaat.id}`}">{kandidaat['naam']}</a> woont in <strong>{kandidaat['verkiezingen']['tk2023']['woonplaats']}</strong></li>
						{/each}
					</ul>
				</details>
			</div>
		</article>
		<!-- <article class="card">
			<p class="label"></p>
			<div>
				<h2></h2>
				<p>leeftijd: 18-25, 25-23, ... hoeveel zitten er in welke categorie?</p>
				<p>1946-1964: hoe groot aandeel hebben de boomers? (silent >1945, gen x 1965-1980, millenials 1980-1995, gen z 1996+)</p>
			</div>
		</article>
		<article class="card">
			<p class="label"></p>
			<div>
				<h2></h2>
				<p>stedelijk/landelijk: wat is de verhouding tussen het aantal meest stedelijke kandidaten en het aantal meest landelijke kandidaten?</p>
			</div>
		</article>
		<article class="card">
			<p class="label"></p>
			<div>
				<h2></h2>
				<p>hoeveel mensen komen er van onder de rivieren? Zeeland, Friesland, Limburg, Waddeneilanden</p>
			</div>
		</article>
		<article class="card">
			<p class="label"></p>
			<div>
				<h2></h2>
				<p>eerdere politieke functies (politieke ervaring): hoeveel hebben er al een raadsfunctie op zitten?</p>
			</div>
		</article>
		<article class="card">
			<p class="label"></p>
			<div>
				<h2></h2>
				<p>meer [CEO’s die Pieter heten] dan [vrouwelijke CEO’s] (lekker filters combineren tot je iets leuks hebt gevonden)</p>
			</div>
		</article> -->
	</section>


</main>

<style lang="scss">
.numbers {
	display: grid;
	gap: 2em;
	grid-template-columns: repeat(auto-fill, minmax(17em, 1fr));
	margin-top: 2em;

	& .card {
		margin-bottom: 0;
		padding: 1.5em 2em;
	}
}

.label {
	color: rgba(var(--foreground), .7);
	font-size: .9rem;
	margin-top: .5em;
	text-transform: uppercase;
	letter-spacing: .15em;
}

h2:has(.number) {
	font-weight: 400;
}	

.number {
	display: block;
	font-size: 3em;
	font-weight: 800;
	margin-bottom: .1em;
}

details {
	& summary::marker {
		float: right;
	}

	& p {
		margin: 1em 0;
	}
}

summary {
	margin-bottom: 1em;
}

table {
	border-spacing: 0;
	line-height: 1.1;
	text-align: left;

	& caption {
		font-style: italic;
		margin: 1em 0 .5em;
	}

	& th, td {
		padding: .4em .2em;
	}

	& th:first-child, td:first-child {
		text-align: right;
		padding-right: .5em;
	}

	& tbody tr:nth-child(odd) {
		background-color: rgba(var(--foreground), .2);
	}
}

ol {
	& li {
		padding-left: .5em;
		list-style-type: decimal;

		&::marker {
			color: rgba(var(--foreground), .8);
		}
	}
}

ul {
	margin: .5em 0;
	padding-left: 1.5em;

	& li {
		list-style-type: disc;
	}
}
</style>