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
				De <a href="https://www.kiesraad.nl/adviezen-en-publicaties/publicaties/2025/09/25/overzicht-kandidatenlijsten-tweede-kamerverkiezing-2025">kandidatenlijsten</a> met naam, woonplaats en in een deel van de gevallen geslacht komen van de <a href="https://www.kiesraad.nl/">Kiesraad</a>.
			</li>
			<li>
				Informatie over woonplaatsen en gemeenten komen van het <a href="https://www.kadaster.nl/">Kadaster</a> en <a href="https://cbs.nl/">CBS</a>. We gebruiken de <a href="https://data.labs.kadaster.nl/_api/datasets/cbs/wbk">Wijk- en Buurtkaart 2020</a>, <a href="https://bag.basisregistraties.overheid.nl">Basisregistratie Adressen en Gebouwen (BAG)</a> en <a href="https://opendata.cbs.nl/#/CBS/nl/dataset/84929NED/table">Gebieden in Nederland 2021</a>.
			</li>
			<li>
				De historische verkiezingsdeelname komt van <a href="https://verkiezingsarchief.nl/">Verkiezingsarchief</a>, waar we ook de Wikidata-links vandaan hebben.
			</li>
			<li>
				Leeftijden, het geslacht van sommige kandidaten en persoonlijke websites halen we van <a href="https://www.wikidata.org/wiki/Wikidata:Main_Page">Wikidata</a> en de partners hieronder. Ieder datapunt op Wikidata heeft daar weer een eigen (set van) bronnen.
			</li>
		</ul>
	</section>

	<section>
		<h2>Partners</h2>
		<ul>
			<li>
				<a href="https://stemopeenvrouw.com/">Stem op een Vrouw</a>
				<details>
					<summary>Over</summary>
					<p>Dé organisatie die zich in Nederland inzet voor de positie van vrouwen in de politiek. Van hen krijgen we ook een aanvullende set geslachten en (social media-)links.</p>
				</details>
			</li>
			<li>
				<a href="https://nerdvote.nl/">NerdVote</a>
				<details>
					<summary>Over</summary>
					<p>NerdVote wil kandidaat-kamerleden steunen die bij willen dragen aan privacyvriendelijke en veilige IT zonder Big-Tech.</p>
				</details>
			</li>
			<li>
				<a href="https://rainbowvote.nu/">Rainbowvote.nu</a> van het <a href="https://coc.nl/">COC</a>
				<details>
					<summary>Over</summary>
					<p>COC nodigde politieke partijen uit om profielen in te sturen van hun regenboogkandidaten. Alle partijen met ten minste een zetel in de Tweede Kamer of een zetel in de zetelpeiling zijn uitgenodigd mee te doen. PVV, NSC, DENK, FVD, SGP, ChristenUnie en JA21 hebben geen antwoorden ingestuurd.</p>
				</details>
			</li>
			<li>
				<a href="https://stemjong.nl/">Stem Jong</a>
				<details>
					<summary>Over</summary>
					<p>Stichting Stem op een Jongere (Stem Jong) werkt sinds 2021 aan meer jongeren participatie en representatie in alle lagen van de politiek. Wij geloven in een wereld waarin jongeren kunnen meedoen in de politiek en onze toekomst kunnen vorm geven. Daarom geven wij jonge kandidaten een platform en verzamelen wij data zodat we kunnen laten zien welke jongeren verkiesbaar zijn. Met onze campagne stimuleren we niet allen jongeren om te gaan stemmen, maar ook om slim te gaan stemmen op een jongere lager op de lijst. Samen stemmen op een jongere.</p>
				</details>
			</li>
			<li>
				<a href="https://vinddebetaopdelijst.nl/">Vind de bèta op de lijst</a>
				<details>
					<summary>Over</summary>
					Vind de bèta op de lijst selecteert kandidaten die een bèta studie hebben gedaan. Daarbij kijken ze alleen naar partijen die kans maken op minstens één zetel in de peilingen.
				</details>
			</li>
<!--			<li>-->
<!--				<a href="https://kleurdekamer.nl/">Kleur de Kamer</a>-->
<!--			</li>-->
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
				We staan op de <a href="https://verkiezingen.prodemos.nl/verkiezingsinformatie/tweede-kamer/#partijen-en-kandidaten-bepalen-op-wie-je-gaat-stemmen">verkiezings-informatie-pagina</a> van <a href="https://prodemos.nl/">ProDemos</a> (ook bekend van de <a href="https://tweedekamer2025.stemwijzer.nl/">Stemwijzer</a>).
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