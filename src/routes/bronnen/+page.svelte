<svelte:head>
	<title>Bronnen & Dank - Op wie kan ik stemmen?</title>
	<meta name="description" content="Waar we de informatie vandaan halen en wie ons helpt">
</svelte:head>

<main>
	<h1>Bronnen</h1>

	<section>
		<h2>Data</h2>
		<p>De data op onze website komt uit de volgende bronnen:</p>
		<ul>
			<li>
				De <a href="https://www.kiesraad.nl/adviezen-en-publicaties/proces-verbalen/2023/10/23/definitief-vastgestelde-kandidatenlijsten-tk-2023">kandidatenlijsten</a> met naam, woonplaats en in een deel van de gevallen geslacht komen van de <a href="https://www.kiesraad.nl/">Kiesraad</a>.
			</li>
			<li>
				Informatie over woonplaatsen en gemeenten komen van het <a href="https://www.kadaster.nl/">Kadaster</a> en <a href="https://cbs.nl/">CBS</a>. We gebruiken de <a href="https://data.labs.kadaster.nl/_api/datasets/cbs/wbk">Wijk- en Buurtkaart 2020</a>, <a href="https://bag.basisregistraties.overheid.nl">Basisregistratie Adressen en Gebouwen (BAG)</a> en <a href="https://opendata.cbs.nl/#/CBS/nl/dataset/84929NED/table">Gebieden in Nederland 2021</a>.
			</li>
			<li>
				De historische verkiezingsdeelname komt van <a href="https://verkiezingsarchief.nl/">Verkiezingsarchief</a>, waar we ook de Wikidata-links vandaan hebben.
			</li>
			<li>
				Leeftijden, het geslacht van sommige kandidaten en persoonlijke websites halen we van <a href="https://www.wikidata.org/wiki/Wikidata:Main_Page">Wikidata</a>. Ieder datapunt heeft daar weer een eigen (set van) bronnen.
			</li>
		</ul>
	</section>

	<section>
		<h2>Partners</h2>
		<p>Binnenkort hopen we de lijsten van de volgende inititatieven ook te verwerken:</p>
		<ul>
			<li>
				<a href="https://stemopeenvrouw.nl/">Stem op een Vrouw</a>
			</li>
			<li>
				<a href="https://kleurdekamer.nl/">Kleur de Kamer</a>
			</li>
			<li>
				<a href="https://vinddebetaopdelijst.nl/">Vind de bèta op de lijst</a>
			</li>
			<li>
				<a href="https://rainbowvote.nu/">Rainbowvote</a>
			</li>
		</ul>
	</section>
	
	<section>
		<h2>Vrienden</h2>
		<p>Dankzij de hulp van een aantal mensen en inititatieven komen we nog een stapje verder:</p>
		<ul>
			<li>
				<a href="https://openstate.eu/">Open State</a> helpt ons met tips, contacten en ze maken <a href="https://waarismijnstemlokaal.nl/">Waar is mijn stemlokaal?</a>.
			</li>
			<li>
				<a href="https://www.instagram.com/zoetst/">Zoë Sabajo</a> helpt ons met tips, feedback en plaatst nuttige informatie over de Tweede Kamerverkiezing op haar Instagram.
			</li>
			<li>
				We staan op de <a href="https://verkiezingen.prodemos.nl/verkiezingsinformatie/tweede-kamerverkiezing/">verkiezings-informatie-pagina</a> van <a href="https://prodemos.nl/">ProDemos</a> (ook bekend van de <a href="https://tweedekamer2023.stemwijzer.nl/">Stemwijzer</a>).
			</li>
		</ul>
	</section>

</main>

<style lang="scss">
ul,
p {
	max-width: 60ch;
}

ul {
	padding: revert;
	margin: revert;

	& li {
		list-style-type: disc;
		margin: 1em 0;
	}
}
</style>