<script>
	// export let data;

	import { page } from '$app/stores';
	import { user } from '$lib/stores/filters';
	import { getAge } from '$lib/util/candidates';

	import Sources from '../../bronnen/Sources.svelte';

	const kandidaat = $page.data.kandidaten.find(kandidaat => kandidaat.id === $page.params.slug);

	const dateOptions = { year: "numeric", month: "long", day: "numeric" }

	let shareText;
	let verkiezing;
	let hyperlinks;
	let sociallinks;
	let partij;
	if (kandidaat) {
		
		verkiezing = kandidaat.verkiezingen.tk2025;
		partij = $page.data.partijen.find(partij => partij.naam === verkiezing.partij_naam);
		shareText = `Ik denk dat ik op ${kandidaat.naam} van ${verkiezing.partij_naam} ga stemmen! Weet jij het al?`;

		const newsLink = {
			'url': `https://news.google.com/search?q=${kandidaat.naam} ${verkiezing.partij_naam}&hl=nl&gl=NL&ceid=NL:nl`,
			'description': `${kandidaat.naam} op Google News`
		};
		hyperlinks = [newsLink];
		sociallinks = [];
		for (const key in kandidaat.urls) {
			if (key.includes('wikidata')) continue;
			let link = {
				'url': kandidaat.urls[key],
				'description': key
			};
			if (['Twitter', 'LinkedIn', 'Instagram', 'Facebook', 'BlueSky'].includes(key)) {
				sociallinks.push(link);
			} else {
				hyperlinks.push(link);
			}
		}


	}
</script>

<svelte:head>
	<title>{kandidaat ? kandidaat.naam : 'Niet gevonden'} - Op wie kan ik stemmen?</title>
	<meta name="description" content="{kandidaat ? `Wat wij weten over ${kandidaat.naam}` : 'Deze kandidaat is niet gevonden'}">
</svelte:head>

<main>
	{#if kandidaat}
		<nav aria-label="overzichten">
			<ul>
				<li>
					<a href="/kandidaten">
						<span aria-hidden="true">{'<-'}</span>
						Alle kandidaten
					</a>
				</li>
				<li>
					<a href="/partijen">
						<span aria-hidden="true">{'<-'}</span>
						Alle partijen
					</a>
				</li>
			</ul>
		</nav>
	
		<h1>{kandidaat.naam}</h1>

		<div class="properties">
			<section class="polls card">
				{#if partij.polls}
					<p>
						{kandidaat.voornaam} heeft een
						<strong>
							{#if verkiezing.lijstnummer < partij.polls.min}
								grote kans om in de kamer te komen.
							{:else if verkiezing.lijstnummer < partij.polls.max}
								redelijke kans om in de kamer te komen.
							{:else}
								kleine kans om in de kamer te komen.
							{/if}
						</strong>
					</p>
					<p>
						{partij.simpele_naam} staat namelijk op {partij.polls.min} tot {partij.polls.max}
						zetels in de peilingen en {kandidaat.voornaam} staat op plek {verkiezing.lijstnummer}.
						Met jouw stem wordt die kans natuurlijk (nog) groter!
					</p>
				{:else}
					<p>
						{kandidaat.voornaam} heeft een <strong>kleine kans om in de kamer te komen.</strong>
					</p>
					<p>
						{partij.simpele_naam} staat namelijk op 0 zetels in de peilingen.
						Met jouw stem wordt de kans natuurlijk groter!
					</p>
				{/if}
				<p class="source">Peilinginformatie van <a href="https://peilingwijzer.tomlouwerse.nl/">Peilingwijzer</a>, laatst bijgewerkt: 21-10-2025.</p>
			</section>

			<section class="basics card">
				<h2>De basis</h2>
				<ul>
					<li>
						Partij: <strong><a href="/partij/{partij.simpele_naam}">{verkiezing.partij_naam}</a></strong>
					</li>
					<li>
						Lijstnummer: <strong>{verkiezing.lijstnummer}</strong>
					</li>
					{#if kandidaat.tweedekamer}
					<li>
						Zat al eerder in de <strong>Tweede Kamer</strong>
					</li>
					{/if}
					{#if kandidaat.eerstekamer}
					<li>
						Zat al eerder in de <strong>Eerste Kamer</strong>
					</li>
					{/if}
					<li>
						Woonplaats: <strong>{verkiezing.woonplaats}</strong>
						{#if verkiezing.gemeente}({verkiezing.gemeente.stedelijkheid}){/if}
					</li>
					<li>
						Geslacht: <strong>{kandidaat.geslacht === null ? 'Onbekend' : kandidaat.geslacht === 'v' ? 'Vrouw' : kandidaat.geslacht === 'x' ? 'X' : 'Man' }</strong>
					</li>
					{#if kandidaat.geboortedatum && getAge(kandidaat.geboortedatum)}
					<li>
						Leeftijd: <strong>{getAge(kandidaat.geboortedatum)}</strong>
					</li>
					{:else if kandidaat.leeftijd}
					<li>
						Leeftijd: <strong>{kandidaat.leeftijd}</strong>
					</li>
					{/if}
					{#if kandidaat.nerdvote}
						<li>
							Dit is een <strong>NerdVote</strong>-kandidaat
						</li>
					{/if}
					{#if kandidaat.rainbowvote}
						<li>
							Dit is een <strong>Rainbowvote</strong>-kandidaat
						</li>
					{/if}
					{#if kandidaat.vinddebeta}
						<li>
							Dit is een <strong>Vind de Bèta</strong>-kandidaat
						</li>
					{/if}
					{#if kandidaat.kleurdekamer}
						<li>
							Dit is een <strong>Kleur de Kamer</strong>-kandidaat
						</li>
					{/if}
				</ul>
			</section>

			<section class="links">
				<h2>Links</h2>
				<ul>
					{#each hyperlinks as link}
						<li>
							<a class="card" href="{link.url}" rel="noreferrer">
								{link.description}
							</a>
						</li>
					{/each}
				</ul>
				{#if sociallinks.length > 0}
					<h3>Social media</h3>
					<ul>
						{#each sociallinks as link}
							<li>
								<a class="card" href="{link.url}" rel="noreferrer">
									{link.description}
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</section>

			<section class="kieskringen">
				<h2>Kieskringen</h2>
				{#if verkiezing.kieskringen}
					{#if verkiezing.kieskringen.length == 20}
						<p>Verkiesbaar in alle kieskringen.</p>
					{:else}
						<p>Verkiesbaar in {verkiezing.kieskringen.length} van de 20 kieskringen:</p>
						<ul>
							{#each verkiezing.kieskringen as kieskring}
								<li>{kieskring}</li>
							{/each}
						</ul>
					{/if}
				{/if}
			</section>

			<aside class="links">
				<h2>Dit wordt mijn kandidaat!</h2>
				<p>Ben je eruit?</p>
				<ul>
					{#if $user.stemlocatie}
					<li>
						<a class="card" href="https://waarismijnstemlokaal.nl/s/{$user.stemlocatie}">Vind een stemlokaal in {$user.stemlocatie}</a>
					</li>
					{:else}
					<li>
						<a class="card" href="https://waarismijnstemlokaal.nl/">Vind een stemlokaal in de buurt</a>
					</li>
					{/if}
					<li>
						<a class="card" data-action="share/whatsapp/share"
							href="whatsapp://send?text={shareText} {$page.url}">Deel het op WhatsApp</a>
					</li>
				</ul>
			</aside>

			{#if kandidaat.tweedekamer}
				{#if kandidaat.tweedekamer.fractions.length > 0}
					<section class="studies">
						<h2>Eerder in de Tweede Kamer</h2>
						<ul>
							{#each kandidaat.tweedekamer.fractions as fraction}
								<li>
									Namens <strong>{fraction.partij}</strong>
									{#if fraction.end}
										van {new Date(fraction.start).toLocaleDateString('nl-NL', dateOptions)} tot {new Date(fraction.end).toLocaleDateString('nl-NL', dateOptions)}
									{:else}
										sinds {new Date(fraction.start).toLocaleDateString('nl-NL', dateOptions)}
									{/if}
								</li>
							{/each}
						</ul>
					</section>
				{/if}
			{/if}

			{#if kandidaat.eerstekamer}
				{#if kandidaat.eerstekamer.fractions.length > 0}
					<section class="studies">
						<h2>Eerder in de Eerste Kamer</h2>
						<ul>
							{#each kandidaat.eerstekamer.fractions as fraction}
								<li>
									<strong>{fraction.partij}</strong>
									{#if fraction.end}
										van {new Date(fraction.start).toLocaleDateString('nl-NL', dateOptions)} tot {new Date(fraction.end).toLocaleDateString('nl-NL', dateOptions)}
									{:else}
										sinds {new Date(fraction.start).toLocaleDateString('nl-NL', dateOptions)}
									{/if}
								</li>
							{/each}
						</ul>
					</section>
				{/if}
			{/if}

			{#if kandidaat.studies}
				<section class="studies">
					<h2>Onderwijs</h2>
					<ul>
						{#each kandidaat.studies as study}
							<li>
								<strong>{study.study}</strong>
								{#if study.institution}
									aan {study.institution}
								{/if}
							</li>
						{/each}
					</ul>
				</section>
			{/if}
		</div>

		<Sources />
	{:else}
		<h1>Niet gevonden</h1>
		<p>We kunnen deze kandidaat helaas niet vinden.</p>
	{/if}
</main>

<style lang="scss">
.properties {
	@media (min-width: 50em) {
		display: grid;
		grid-column-gap: 3em;
		grid-template-columns: [left] 1fr [right] 40vw;
	}
}

.card {
	grid-column-start: left;

	& h2 {
		margin-top: .5em;
	}
}

li {
	margin: .75em 0;
}

.polls {
	& p {
		margin-block: .75em;
	}

	& .source {
		display: block;
		font-size: .9em;
		color: rgba(var(--foreground), .8);
	}
}

[aria-label="overzichten"] ul {
	display: flex;
	flex-flow: row wrap;
	gap: 2em
}

.links {
	grid-column: right;

	&:not(aside) {
		grid-row-start: 1;

		&:has(:nth-child(3)) {
			grid-row: 1 / span 2;
		}
	}

	& > h2 {
		@media (min-width: 50em) {
			margin-top: 0;
		}
	}

	& > ul .card {
		background: rgb(var(--background), .5);

		&:hover {
			background: rgb(var(--background), 1);
		}
	}
}

.links a {
	display: block;

	&::first-letter {
		text-transform: capitalize;
	}

	&::after {
		float: right;
	}
}

aside {
	border-top: 1px solid rgba(var(--foreground), .8);
	margin-top: 2em;
	padding-top: 2em;
}
</style>
