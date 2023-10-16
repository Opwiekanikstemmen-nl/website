<script>
	import { page } from '$app/stores';
</script>

<footer class={$page.url.pathname === '/' ? 'home' : ''}>
	<section>
		<h3>Contact</h3>
		<ul>
			<li>
				<a href="mailto:info@owkis.nl">info@owkis.nl</a>
			</li>
			<li>
				<a href="https://www.instagram.com/opwiekanikstemmen/">Instagram</a>
			</li>
			<li>
				<a href="https://www.facebook.com/opwiekanikstemmen/">Facebook</a>
			</li>
			<li>
				<a href="https://www.linkedin.com/company/opwiekanikstemmen/">LinkedIn</a>
			</li>
			<li>
				<a href="https://www.x.com/dekandidaten/">X (voormalig Twitter)</a>
			</li>
		</ul>
	</section>
	<section>
		<h3>Sitemap</h3>
		<ul>
			<li><a href="/" title="Home">Home</a></li>
			<li><a href="/kandidaten" title="kandidaten">Kandidaten</li>
			<li><a href="/partijen" title="Partijen">Partijen</a></li>
			<li><a href="/veelgestelde-vragen" title="Veelgestelde vragen">Veelgestelde vragen</a></li>
			<li><a href="/over" title="Over">Over</a></li>
			<li><a href="/partners" title="Partners">Partners</li>
			<li><a href="/privacy" title="Privacy">Privacy</a></li>
		</ul>
	</section>
	<section>
		<h3>Cookies</h3>
		<p>We plaatsen geen cookies.</p>
		<a href="/privacy" title="Privacy">Ons privacybeleid</a>
	</section>

	<section>
		<h3>Data</h3>
		<p>We zijn bezig om de data openbaar beschikbaar te stellen. Voor nu: neem contact op voor het gebruik van de data.</p>
	</section>
</footer>

<style lang="scss">
	footer {
		display: flex;
		flex-flow: row wrap;
		padding: 3em var(--base-padding);
		margin-top: var(--base-padding);
		background: rgba(var(--background), 1);
	}

	section {
		max-width: 20em;
		width: 12.5em;
		flex-grow: 1;
		flex-shrink: 0;
	}

	li,
	p {
		margin: 1em 0;
	}
</style>