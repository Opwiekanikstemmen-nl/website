<script>
    import { page } from '$app/stores';
</script>

<header class={$page.url.pathname === '/' ? 'home' : ''}>
    <a href="/" title="Op wie kan ik stemmen?" class="logo">Home</a>
    <nav>
        <ul>
            <li><a href="/about">Partners</a></li>
            <li><a href="/contact">FAQ</a></li>
            <li><a href="/over">Over ons</a></li>
        </ul>
    </nav>
</header>

<style lang="scss">

    header {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;;

        width: 100%;
        padding: 4.5vw var(--base-padding) 2em;

        &.home {
            padding-top: var(--base-padding);
        }
    }

    .logo {
        align-items: center;
        cursor: pointer;
        display: flex;
        height: 100%;
        justify-content: center;
        max-height: 3em;
        max-width: 3em;
        min-height: 1em;
        min-width: 1em;
        position: relative;
        width: 100%;

        &::after {
            background: rgb(var(--background));
            border-radius: 50%;
            content: "";
            padding-bottom: calc((100% / 3) * 2);
            position: absolute;
            width: calc((100% / 3) * 2);
        }

        &::before {
            background: rgb(var(--foreground));
            content: "";
            padding-bottom: 100%;
            position: absolute;
            width: 100%;
        }
    }

    nav ul {
        display: flex;
        flex-flow: row nowrap;
        gap: 1rem;
    }

    nav ul a {
        padding: 1em .75em 1em 0;
    }


</style>