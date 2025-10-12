<script>
	import { page } from '$app/stores';
</script>

<footer class={$page.url.pathname === '/' ? 'home' : ''}>
	<section>
		<h2>Contact</h2>
		<ul>
			<li>
				<a href="mailto:info@owkis.nl">info@owkis.nl</a>
			</li>
			<li>
				<a href="https://mastodon.nl/@opwiekanikstemmen/" rel="me">Mastodon</a>
			</li>
			<li>
				<a href="https://bsky.app/profile/opwiekanikstemmen.bsky.social">Bluesky</a>
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
		</ul>
	</section>
	<section>
		<h2>Sitemap</h2>
		<h3>2025</h3>
		<ul>
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="/kandidaten">Kandidaten</a>
			</li>
			<li>
				<a href="/partijen">Partijen</a>
			</li>
			<li>
				<a href="/cijfers">Cijfers</a>
			</li>
			<li>
				<a href="/bronnen">Bronnen</a>
			</li>
		</ul>
		<h3>Algemeen</h3>
		<ul>
			<li>
				<a href="https://opwiekanikstemmen.nl">Overzicht</a>
			</li>
			<li>
				<a href="https://opwiekanikstemmen.nl/faq">FAQ</a>
			</li>
			<li>
				<a href="https://opwiekanikstemmen.nl/over">Over</a>
			</li>
			<li>
				<a href="https://opwiekanikstemmen.nl/privacy">Privacy</a>
			</li>
		</ul>
	</section>
	<section>
		<h2>Cookies</h2>
		<p>We plaatsen geen cookies.</p>
		<a href="https://opwiekanikstemmen.nl/privacy">Ons privacybeleid</a>
	</section>

	<section>
		<h2>Data</h2>
		<p>De informatie is een samenstelling van verschillende <a href="/bronnen">bronnen</a>. De volledige <a href="https://github.com/Opwiekanikstemmen-nl/data">dataset staat op GitHub</a>.</p>
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