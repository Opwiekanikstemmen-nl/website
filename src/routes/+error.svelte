<script>
	import { page } from '$app/stores';
    console.log($page)
</script>

<main>
    <h1>{`${$page?.status} ${$page?.error?.message}`}</h1>
</main>

<style lang="scss">

</style>