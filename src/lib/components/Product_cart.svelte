<script lang="ts">
	import { delete_product, is_the_last_element, update_cart } from '$lib/ts/cart';
	import { dialogs } from 'svelte-dialogs';

	export let product_name: string, qty: number, prodotti_cms;

    prodotti_cms = prodotti_cms.items.filter(prod => prod.fields.nome == product_name);

    function plus() {
		qty++;
		const cart = JSON.parse(localStorage.getItem('cart'));
		cart[product_name] = qty;
		update_cart(cart);
	}

	function minus() {
		const cart = JSON.parse(localStorage.getItem('cart'));
		if (is_the_last_element(cart[product_name]))
			dialogs.confirm("Vuoi eliminare l'elemento?").then((response) => {
				if (response) delete_product(cart, product_name);
                else location.reload();
			});
		else {
			qty--;
			cart[product_name] = qty;
			update_cart(cart);
		}
	}

    function delete_product_from_cart() {
        const cart = JSON.parse(localStorage.getItem('cart'));
        delete_product(cart, product_name);
        update_cart(cart);
        location.reload();  // Ricarica la pagina per triggerare il reload del carrello
    }
</script>

<div class="row">
	<div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
		<div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
			<img src={prodotti_cms[0].fields.foto.fields.file.url.replace("//", "https://")} class="w-100" alt={product_name} />
			<a href="#!">
				<div class="mask" style="background-color: rgba(251, 251, 251, 0.2)" />
			</a>
		</div>
	</div>

	<div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
		<p><strong>{product_name}</strong></p>
		<button
			type="button"
			class="btn primary btn-sm me-1 mb-2"
			data-mdb-toggle="tooltip"
			title="Remove item"
            on:click={delete_product_from_cart}
		>
			<i class="fas fa-trash" />
		</button>
	</div>

	<div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
		<div class="d-flex mb-4" style="max-width: 300px">
			<button
				on:click={minus}
				class="btn primary px-3 me-2"
				onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
			>
				<i class="fas fa-minus" />
			</button>

			<div class="form-outline">
				<input
					id="form1"
					min="0"
					name="quantity"
					value={qty}
					type="number"
					class="form-control"
					readonly
				/>
				<label class="form-label" for="form1">Quantità</label>
			</div>

			<button
				class="btn primary px-3 ms-2"
				on:click={plus}
				onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
			>
				<i class="fas fa-plus" />
			</button>
		</div>

		<p class="text-start text-md-center">
			<strong>{qty * prodotti_cms[0].fields.price} &euro;</strong>
		</p>
	</div>
</div>

<style>
    img {
        border-radius: 8px;
    }
</style>