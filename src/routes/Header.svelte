<script>
	import { onMount } from 'svelte';
	import client from '$lib/ts/contentful';
	import { is_types_loaded, product_types } from '$lib/ts/store';

	onMount(async () => {
		const prodotti_types_raw = await client?.getEntries({
			content_type: 'tipologiaProdotti'
		});

		$product_types = prodotti_types_raw.items;
		$is_types_loaded = true;
	});
</script>

<!-- Topbar Start -->
<div class="container-fluid px-0 d-none d-lg-block">
	<div class="row gx-0">
		<div class="col-lg-4 text-center secondary py-3">
			<div class="d-inline-flex align-items-center justify-content-center">
				<i class="bi bi-envelope fs-1 text-first me-3" />
				<div class="text-start">
					<h6 class="text-uppercase mb-1">Scrivici una email</h6>
					<span>sasy.vitrani@gmail.com</span>
				</div>
			</div>
		</div>
		<div class="col-lg-4 text-center primary border-inner py-3">
			<div class="d-inline-flex align-items-center justify-content-center">
				<a href="index.html" class="navbar-brand">
					<h1 class="m-0 text-uppercase text-white">
						<img class="text-dark me-3" src="/favicon.jpg" alt="logo" />Sasy's Cake Away
					</h1>
				</a>
			</div>
		</div>
		<div class="col-lg-4 text-center secondary py-3">
			<div class="d-inline-flex align-items-center justify-content-center">
				<i class="bi bi-phone-vibrate fs-1 text-first me-3" />
				<div class="text-start">
					<h6 class="text-uppercase mb-1">Chiamaci</h6>
					<span>3339273367</span>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- Topbar End -->

<!-- Navbar Start -->
<nav class="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm py-3 py-lg-0 px-3 px-lg-0">
	<a href="index.html" class="navbar-brand d-block d-lg-none">
		<h1 class="m-0 text-uppercase text-white">
			<i class="fa fa-birthday-cake fs-1 text-primary me-3" />CakeZone
		</h1>
	</a>
	<button
		class="navbar-toggler"
		type="button"
		data-bs-toggle="collapse"
		data-bs-target="#navbarCollapse"
	>
		<span class="navbar-toggler-icon" />
	</button>
	<div class="collapse navbar-collapse" id="navbarCollapse">
		<div class="navbar-nav ms-auto mx-lg-auto py-0">
			<a href="/" class="nav-item nav-link active">Home</a>
			<a href="/about" class="nav-item nav-link">Chi sono</a>
			<a href="/why" class="nav-item nav-link">Perchè Sasy's</a>
			<div class="nav-item dropdown">
				<a href="#0" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">I miei prodotti</a>
				<div class="dropdown-menu m-0">
					{#each $product_types as type}
						<a href="/prodotti?type={type.fields.tipologia}" class="dropdown-item" onclick="setTimeout(location.reload.bind(location), 1)"
							>{type.fields.tipologia}</a
						>
					{/each}
				</div>
			</div>
			<a href="/contattaci" class="nav-item nav-link">Contattaci</a>
			<a href="/login" class="nav-item nav-link">Login</a>
			<a href="/carrello" class="nav-item nav-link">Carrello</a>
		</div>
	</div>
</nav>
