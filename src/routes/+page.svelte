<script>
	// export let data;
</script>

<svelte:head>
	<title>Op wie kan ik stemmen?</title>
	<meta name="description" content="Vind het antwoord op één simpele vraag: op wie kan ik stemmen bij de verkiezingen in november 2023?">
</svelte:head>

<main>
	<section>
		<h1>Op wie kan ik stemmen?</h1>
		<p class="tagline">Vind het antwoord op één simpele vraag: op wie kan ik stemmen bij de verkiezingen?</p>
	</section>
	<section>
		<ul>
			<li>
				<a href="/kandidaten" class="block-link">
					<h2>Kandidaten</h2>
					<span>Bekijk en filter de kandidaten</span>
				</a>
			</li>
			<li>
				<a href="/partijen" class="block-link">
					<h2>Partijen</h2>
					<span>Bekijk partijlijsten</span>
				</a>
			</li>
			<li>
				<a href="/cijfers" class="block-link">
					<h2>Cijfers</h2>
					<span>Statistieken over de kandidaten</span>
				</a>
			</li>
		</ul>
	</section>
</main>

<section id="gaan-stemmen">
	<h2>Hoe ga ik stemmen?</h2>
	<p>Wij helpen je met op wie je kunt stemmen, maar hoe pak je het verder aan?</p>
	<ol>
		<li>
			<h3>Vind een partij</h3>
			<p>Vergelijk de standpunten en filosofie van de partijen. Een paar websites die je daarbij
				helpen zijn:</p>
			<ul>
				<li><a href="https://tweedekamer2025.stemwijzer.nl/">StemWijzer</a></li>
				<li><a href="https://tweedekamer2025.kieskompas.nl/nl/">Kieskompas</a></li>
				<li><a href="https://partijenwijzer.nl/">PartijenWijzer</a></li>
				<li><a href="https://checkjestem.nl/">Motie Kieswijzer</a></li>
				<li><a href="https://technologiekieswijzer.nl/">Technologiekieswijzer</a></li>
			</ul>
			<p class="tip">
				<strong>Tip:</strong>
				lees en luister interviews met de partijleiders en lees de verkiezings&shy;programma’s
				door.
			</p>
		</li>
		<li>
			<h3>Vind een kandidaat</h3>
			<p>Filter de kandidatenlijst op dingen die jij belangrijk vindt en duik in de kandidaten die
				eruit komen.</p>
			<p><a href="/kandidaten">Naar de kandidatenlijst</a></p>
			<p class="tip">
				<strong>Tip:</strong>
				denk voor de filters aan wat jij belangrijk vindt, zoals één van de filters van onze
				partners.</p>
		</li>
		<li>
			<h3>Naar het stemhokje</h3>
			<p>Als je weet wie het wordt, pak je stempas en identiteitsbewijs en ga naar het
				stemlokaal.</p>
			<p><a href="https://waarismijnstemlokaal.nl/">Vind jouw stemlokaal</a></p>
			<p class="tip"><strong>Tip:</strong> meer informatie vind je op de website van de
				<a
					href="https://www.rijksoverheid.nl/onderwerpen/verkiezingen/vraag-en-antwoord/hoe-stemmen-bij-de-verkiezingen">
					Rijksoverheid</a>
			</p>
		</li>
	</ol>
</section>

<style lang="scss">
	main {
		margin-top: 4rem;
		min-height: 100%;
		padding: 0 var(--base-padding) var(--base-padding);

		@media (min-width: 1200px) {
			align-items: center;
			display: flex;
			justify-content: space-between;
		}
	}

	h1 {
		flex-grow: 0;
		font-size: min(15vw, 6em);
		line-height: 1;
		margin: 0;
		width: 7.5ch;
		margin-bottom: .75em;

		@media (min-width: 1200px) {
			margin-right: .5em;
			margin-bottom: .2rem;
		}
	}

	.tagline {
		font-size: 1.45em;
		line-height: 1.1;
		margin: 1.5em 0;
		max-width: 40ch;
	}

	li h2 {
		margin: 0 0 .5em;

		&::after {
			content: "\2192";
			display: block;
			float: right;
			transition: all 100ms ease-out;
		}
	}

	.block-link {
		background: rgb(var(--background));
		border-radius: .5em;
		box-shadow: 0px 5px 20px rgba(var(--foreground), 0.15);
		color: rgb(var(--foreground));
		display: block;
		margin-bottom: 1em;
		padding: 1em;
		transition: all 100ms ease-out;
		text-decoration: none;

		&:hover,
		&:focus {
			box-shadow: 0px 5px 25px rgba(var(--foreground), 0.2);
			text-decoration: underline;
			transform: translateY(-.15em);

			& > h2::after {
				transform: translateX(.25em);
			}
		}

		@media (min-width: 768px) {
			padding: 2em;
			padding-right: 4em;
		}

	}

	#gaan-stemmen {
		border-top: 1px solid rgb(var(--foreground));
		padding: var(--base-padding);

		& h2 {
			font-size: 2em;
		}
	}

	ol {
		display: flex;
		flex-wrap: wrap;
		padding: 0;
		gap: 2em;
		margin-top: 2em;

		& > li {
			counter-increment: steps;
			background: rgb(var(--background));
			border-radius: .5em;
			box-shadow: 0px 5px 20px rgba(var(--foreground), 0.15);
			color: rgb(var(--foreground));
			flex-grow: 1;
			width: 16em;
			padding: 1em;
			list-style-type: none;
			position: relative;
			flex-direction: column;
			margin-bottom: auto;

			@media (min-width: 768px) {
				padding: 2em;
			}

			&::before {
				content: "Stap " counter(steps);
				color: rgba(var(--foreground), .75);
				font-size: .9rem;
				margin-top: .5em;
				text-transform: uppercase;
				letter-spacing: .15em;
			}

			& p:not(.tip) a {
				display: block;
				padding-block: 1em;
				font-size: 1.2em;
				font-weight: 800;
			}
		}

		& ul {
			margin-bottom: 2em;

			& li {
				margin: 1em .5em 1em 1.5em;
				list-style: disc;
			}
		}

		& h3 {
			margin-block: .5em 1em;
			font-size: 1.4em;
		}
	}

	.tip {
		padding: 1em;
		background-color: rgba(var(--color), .5);
		border-radius: 0 0 .5em .5em;
		border-top: 1px solid rgba(var(--color), 1);
		margin: 1em -1em -1em;
		vertical-align: bottom;

		@media (min-width: 768px) {
			padding: 1.5em 2em;
			margin: 1em -2em -2em;
		}
	}

</style>
