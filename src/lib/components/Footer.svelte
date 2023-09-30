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

    </section>
    <section>
        <h3>Cookies</h3>
        <p>We plaatsen geen cookies.</p>
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
    }

    section {
        max-width: 20em;
        width: 100%;
    }
</style>