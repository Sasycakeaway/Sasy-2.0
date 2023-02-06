<script>
	import Header from './Header.svelte';
	import './styles.css';
	import "bootstrap/dist/js/bootstrap.bundle.js";
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
	<Footer />
</div>
