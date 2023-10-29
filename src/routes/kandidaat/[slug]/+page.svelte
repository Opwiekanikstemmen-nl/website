<script>
	// export let data;

	import { page } from '$app/stores';

	import { getAge } from '$lib/util/candidates';


	let shareText;
	let verkiezing;
	if (kandidaat) {
		
		verkiezing = kandidaat.verkiezingen.tk2023;
		shareText = `Ik denk dat ik op ${kandidaat.naam} van ${verkiezing.partij_naam} ga stemmen! Weet jij het al?`;

		const newsLink = {
			'url': `https://news.google.com/search?q=${kandidaat.naam} ${verkiezing.partij_naam}&hl=nl&gl=NL&ceid=NL:nl`,
			'description': `${kandidaat.naam} op Google News`
		};
		let hyperlinks = [newsLink];
		for (const key in kandidaat.urls) {
			hyperlinks.push({
				'url': kandidaat.urls[key],
				'description': key
			});
		}
	}

	const shareText = `Ik denk dat ik op ${kandidaat.naam} van ${kandidaat.verkiezingen.tk2023.partij_naam} ga stemmen! Weet jij het al?`;
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
			<section class="basics card">
				<ul>
					<li>
						Partij: <a href="/partij/{$page.data.partijen.find(partij => partij.naam === verkiezing.partij_naam).simpele_naam}">{verkiezing.partij_naam}</a>, op plaats {verkiezing.lijstnummer}
					</li>
					<li>
						Woonplaats: <strong>{verkiezing.woonplaats}</strong>
					</li>
					{#if kandidaat.geboortedatum}
					<li>
						Leeftijd: <strong>{getAge(kandidaat.geboortedatum)}</strong>
					</li>
					{:else if kandidaat.leeftijd}
					<li>
						Leeftijd: <strong>{kandidaat.leeftijd}</strong>
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
			</section>

			<section class="kieskringen">
				<h2>Kieskringen</h2>
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
			</section>

			<aside class="links">
				<h2>Dit wordt mijn kandidaat!</h2>
				<p>Ben je eruit?</p>
				<ul>
					<li>
						<a class="card" href="https://waarismijnstemlokaal.nl/">Vind een stemlokaal in de buurt</a>
					</li>
					<li>
						<a class="card" data-action="share/whatsapp/share"
							href="whatsapp://send?text={shareText} {$page.url}">Deel het op WhatsApp</a>
					</li>
				</ul>
			</aside>
		</div>
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
}

li {
	margin: .75em 0;
}

[aria-label="overzichten"] ul {
	display: flex;
	flex-flow: row wrap;
	gap: 2em
}

.links {
	grid-column: right;
	grid-row-start: 1;
	grid-row-end: span 2;

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
