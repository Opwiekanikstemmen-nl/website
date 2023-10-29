<script>
	export let data;

	import { meta } from '$lib/stores/meta';

	import { groupByParty } from '$lib/util/candidates';
	import { sortData } from '$lib/util/filters';
	import { count, countParties, countUnkowns } from '$lib/util/statistics';

	$: kandidaten = sortData(data.kandidaten, 'naam', 'desc');

	const parties = groupByParty(data.kandidaten);
	const woonplaatsen = countUnkowns(data.kandidaten, ['verkiezingen', 'tk2023', 'woonplaats']);
	const stedelijkheid = countUnkowns(data.kandidaten, ['verkiezingen', 'tk2023', 'gemeente', 'stedelijkheid']);
	const sharesStedelijkheid = {'Zeer sterk stedelijk': 0.257057929668623, 'Sterk stedelijk': 0.3033547987272405, 'Niet stedelijk': 0.07340226254998808, 'Matig stedelijk': 0.14899154040118648, 'Weinig stedelijk': 0.21719346865296188, 'Onbekend': 0};
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
			<h2><span class="number">{partySizes[0][1]}</span> zoveel kandidaten staan er op de langste lijst</h2>
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
		</article>
		<article class="card">
			<p class="label">Mannen/vrouwen</p>
			<h2><span class="number">{(count(kandidaten, 'geslacht', 'm')/count(kandidaten, 'geslacht', 'v')).toFixed(1)}&times;</span> meer mannen dan vrouwen zijn verkiesbaar*</h2>
			<details>
				<summary>Van alle kandidaten zijn er {count(kandidaten, 'geslacht', 'm')} man en {count(kandidaten, 'geslacht', 'v')} vrouw. Van {count(kandidaten, 'geslacht', null)} kandidaten weten we het niet.</summary>
				<p>Dat we het van sommige kandidaten niet weten, komt omdat een aantal partijen geen geslacht doorgeeft bij het inleveren van hun kandidatenlijsten.</p>
				<p>Verder wordt er bij de kandidatenlijsten niet iemands gender opgeschreven. Daardoor weten we dus ook niet of er non-binaire kandidaten op de lijsten staan.</p>
			</details>
		</article>
		<article class="card">
			<p class="label">Woonplaatsen</p>
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
		</article>
		<article class="card">
			<p class="label">Buitenland</p>
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
		</article>
		<article class="card">
			<p class="label">Landelijk of stedelijk</p>
			<h2><span class="number">{Math.round(stedelijkheid[0][1]/$meta.kandidaten*100)}%</span> woont in {stedelijkheid[0][0].toLowerCase()} gebied</h2>
			<details>
				<summary>Daarmee zijn die {stedelijkheid[0][0].toLowerCase()}e oververtegen&shy;woordigd.</summary>
				<p>Het CBS deelt gemeentes in op <a href="https://www.cbs.nl/nl-nl/nieuws/2023/42/minder-huishoudelijk-afval-per-inwoner-in-2022/stedelijkheid">stedelijkheid</a>. Op basis van de woonplaats van een kandidaat kunnen we dus zeggen of die in stedelijk of landelijk gebied woont.</p>
				<p>Natuurlijk wonen er ook meer mensen in de (zeer) sterk stedelijke gebieden dan in de niet stedelijke. Ook als we dat in ons achterhoofd houden zijn de stedelingen oververtegenwoordigd op de kandidatenlijsten.</p>
				<table>
					<caption>
						Het percentage kandidaten en inwoners per stedelijkheids-niveau
					</caption>
					<thead>
						<tr>
							<th>Niveau</th>
							<th>Kand.</th>
							<th>Inw.</th>
						</tr>
					</thead>
					<tbody>
						{#each ["Zeer sterk stedelijk", "Sterk stedelijk", "Matig stedelijk", "Weinig stedelijk", "Niet stedelijk", "Onbekend"] as level}
							<tr>
								<td>{stedelijkheid.filter((item) => item[0] === level)[0][0]}</td>
								<td>{Math.round(stedelijkheid.filter((item) => item[0] === level)[0][1]/$meta.kandidaten*100)}%</td>
								<td>{Math.round(sharesStedelijkheid[level] * 100)}%</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</details>
		</article>
		<!-- <article class="card">
			<p class="label"></p>
			<h2></h2>
			<p>leeftijd: 18-25, 25-23, ... hoeveel zitten er in welke categorie?</p>
			<p>1946-1964: hoe groot aandeel hebben de boomers? (silent >1945, gen x 1965-1980, millenials 1980-1995, gen z 1996+)</p>
		</article>
		<article class="card">
			<p class="label"></p>
			<h2></h2>
			<p>hoeveel mensen komen er van onder de rivieren? Zeeland, Friesland, Limburg, Waddeneilanden</p>
		</article>
		<article class="card">
			<p class="label"></p>
			<h2></h2>
			<p>eerdere politieke functies (politieke ervaring): hoeveel hebben er al een raadsfunctie op zitten?</p>
		</article>
		<article class="card">
			<p class="label"></p>
			<h2></h2>
			<p>meer [CEO’s die Pieter heten] dan [vrouwelijke CEO’s] (lekker filters combineren tot je iets leuks hebt gevonden)</p>
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
		display: grid;
		grid-template-rows: min-content min-content 1fr;
		margin-bottom: 0;
		padding: 1.5em 2em;
	}
}

.label {
	color: rgba(var(--foreground), .75);
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
	align-self: stretch;
	background-color: rgba(var(--color), .5);
	border-radius: 0 0 .5em .5em;
	border-top: 1px solid rgba(var(--color), 1);
	margin: 0 -2em -1.5em;
	padding: 1.5em 2em;

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