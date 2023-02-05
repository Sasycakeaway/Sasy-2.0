<script lang="ts">
	import AboutHome from '$lib/components/about_home.svelte';
	import Home_Header from '$lib/components/Home_Header.svelte';
	import HomeProdotti from '$lib/components/home_prodotti.svelte';
	import ServiceHome from '$lib/components/service_home.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Home_Header />

<AboutHome />

<HomeProdotti />

<ServiceHome />

<br>
<br>