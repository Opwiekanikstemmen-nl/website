<script>
	import '$lib/styles/global.scss';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { onMount } from 'svelte';
	onMount(() => {
		page.subscribe(() => {
			updateMatomo();
		});
	});
	function updateMatomo() {
		if (typeof window !== 'undefined' && window._paq) {
			window._paq.push(['setCustomUrl', window.location.href]);
			window._paq.push(['setDocumentTitle', document.title]);
			window._paq.push(['trackPageView']);
		}
	}
</script>

<svelte:head>
	<script>
		if (!window.location.href.includes('localhost')) {
			var _paq = window._paq = window._paq || [];
			_paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
			_paq.push(["setDomains", ["*.opwiekanikstemmen.nl","*.tweedekamer2021.opwiekanikstemmen.nl","*.tweedekamer2023.opwiekanikstemmen.nl"]]);
			_paq.push(['disableCookies']);
			_paq.push(['trackPageView']);
			_paq.push(['enableLinkTracking']);
		}
		(function() {
			var u="https://matomo.fmjansen.com/";
			_paq.push(['setTrackerUrl', u+'matomo.php']);
			_paq.push(['setSiteId', '7']);
			var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
			g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
		})();
	</script>
	<noscript><p><img src="https://matomo.fmjansen.com/matomo.php?idsite=6&rec=1" style="border:0;" alt="" /></p></noscript>
</svelte:head>

<Header />

<slot />

<Footer />

<style lang="scss">

</style>
