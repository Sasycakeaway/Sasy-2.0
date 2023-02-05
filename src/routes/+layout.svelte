<script>
	import Header from './Header.svelte';
	import './styles.css';
	import "bootstrap/dist/js/bootstrap.bundle.js";
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

</div>
