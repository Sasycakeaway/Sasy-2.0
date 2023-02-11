<script>
	import { onMount } from 'svelte';

	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import ProductCart from '$lib/components/Product_cart.svelte';
	import { firebase } from '$lib/ts/store';
	import client from '$lib/ts/contentful';

	let user_logged,
		carrello = {},
		prodotti_cms = [],
		cms_ready = false,
		totale = 0;

	const filter_prod = (product_name) =>
		prodotti_cms.items.filter((prod) => prod.fields.nome == product_name);

	function compute_total() {
		Object.keys(carrello).forEach((product) => {
			const prod = filter_prod(product);
			totale += prod[0].fields.price * carrello[product]; // Prezzo * quantità
		});

		localStorage.setItem("totale", totale.toString());
	}

	function get_product_price(product) {
		const prod = filter_prod(product);
		return prod[0].fields.price * carrello[product];
	}

	onMount(async () => {
		const auth = getAuth($firebase);
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				location.href = '/login'; // The user must be logged in to access cart
			}
			user_logged = user;
		});

		let cart_tmp = localStorage.getItem('cart');
		if (cart_tmp) carrello = JSON.parse(cart_tmp);

		prodotti_cms = await client?.getEntries({
			content_type: 'prodotti'
		});
		cms_ready = true;

		compute_total();
	});
</script>

<section class="h-100 gradient-custom">
	<div class="container py-5">
		<div class="row d-flex justify-content-center my-4">
			<div class="col-md-8">
				<div class="card mb-4">
					<div class="card-header py-3">
						<h5 class="mb-0">Carrello - {Object.keys(carrello).length} prodotti</h5>
					</div>
					<div class="card-body">
						{#if cms_ready}
							{#each Object.keys(carrello) as prod}
								<ProductCart product_name={prod} qty={carrello[prod]} {prodotti_cms} />
							{/each}
						{/if}
					</div>
				</div>
				<div class="card mb-4 mb-lg-0">
					<div class="card-body">
						<p><strong>Metodi di pagamento accettati</strong></p>
						<img
							class="me-2"
							width="45px"
							src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
							alt="Visa"
						/>
						<img
							class="me-2"
							width="45px"
							src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
							alt="American Express"
						/>
						<img
							class="me-2"
							width="45px"
							src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
							alt="Mastercard"
						/>
						<img
							class="me-2"
							width="45px"
							src="https://portaleimpresa24.it/wp-content/uploads/2022/01/paypal-ge77444007_640.png"
							alt="PayPal acceptance mark"
						/>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card mb-4">
					<div class="card-header py-3">
						<h5 class="mb-0">Sommario</h5>
					</div>
					<div class="card-body">
						<ul class="list-group list-group-flush">
							{#if cms_ready}
								{#each Object.keys(carrello) as prod}
									<li
										class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
									>
										<b>{prod}</b>
										<span>{get_product_price(prod)} &euro;</span>
									</li>
								{/each}
							{/if}
							<li class="list-group-item d-flex justify-content-between align-items-center px-0">
								<b>Spedizione</b>
								<span>Gratis, se in Piemonte, altrimenti 8 &euro;</span>
							</li>
							<li
								class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3"
							>
								<div>
									<strong>Totale</strong>
								</div>
								<span><strong>{totale} &euro;</strong></span>
							</li>
						</ul>
						<a href="carrello/pagamenti">
							<button type="button" class="btn primary btn-lg btn-block text-white">
								Vai al pagamento
							</button>
						</a>

					</div>
				</div>
			</div>
		</div>
	</div>
</section>
