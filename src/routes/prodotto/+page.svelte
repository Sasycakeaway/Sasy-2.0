<script lang="ts">
	import { onMount } from 'svelte';
	import client from '$lib/ts/contentful';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
	import { add_new_item, update_cart } from '$lib/ts/cart';
	import { is_mobile } from '$lib/ts/utils';

	let prodotti = {
		fields: {
			nome: '',
			descrizioneLunga: {},
			foto: {
				fields: {
					file: {
						url: ''
					}
				}
			}
		}
	};

	let qty_prod = 0;
	let cart = {};
	let prod: string | null;
	let mobile = false;

	onMount(async () => {
		mobile = is_mobile();
		const url = new URL(window.location.href);
		prod = url.searchParams.get('prod');

		const prodotti_raw = await client?.getEntries({
			content_type: 'prodotti'
		});

		prodotti = prodotti_raw?.items.filter((a) => {
			return a.fields.nome == prod;
		})[0];

		const tmp_cart = localStorage.getItem('cart');
		if (tmp_cart) cart = JSON.parse(tmp_cart);
	});

	function add_prod_to_cart() {
		cart = add_new_item(cart, prod, qty_prod);
		update_cart(cart);
	}
</script>

<svelte:head>
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
		p {
			font-family: 'Poppins', sans-serif;
		}
	</style>
</svelte:head>

<br />
<h1 class="text-center">{prodotti.fields.nome}</h1>

<br />

<div class="grid">
	<div />
	<img
		src={prodotti.fields.foto.fields.file.url.replace('//', 'https://')}
		alt={prodotti.fields.nome}
		class="img-fluid"
		width="512"
	/>

	{@html documentToHtmlString(prodotti.fields.descrizioneLunga)}
</div>
<br />
<br />
<div style="text-align:center;">
	<label for="basic-url" class="form-label">Quantità</label>
	<div class="input-group mb-3 container">
		<input
			type="number"
			class="form-control"
			id="basic-url"
			aria-describedby="basic-addon3"
			bind:value={qty_prod}
		/>
	</div>
	<button class="btn btn-primary text-white btn-lg btn-color" on:click={add_prod_to_cart}
		>Aggiungi al carrello</button
	>
</div>

<style>
	img {
		border-radius: 8px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		place-items: center;
		grid-column-gap: 2em;
	}

	.btn-color {
		background-color: #e88f2a !important;
		border: 0px;
	}
</style>
