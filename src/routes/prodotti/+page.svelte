<script>
	import { onMount } from 'svelte';
	import client from '$lib/ts/contentful';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
	import Banner from '$lib/components/Banner.svelte';
	import { is_types_loaded, product_types } from '$lib/ts/store';
	import Loader from '$lib/components/Loader.svelte';
	import CardProdotti from '$lib/components/Card_Prodotti.svelte';

	let prodotti = [],
		type = '';
	let title = '',
		descrizione = '',
		slide = [];
	let loading = true;
	let product_type = [
		{
			// Dummy structure for banner
			fields: {
				nomeBanner: '',
				secondTextBanner: '',
				testoBanner: {}
			}
		}
	];

	onMount(async () => {
		const url = new URL(window.location.href);
		type = url.searchParams.get('type');
		if (type != 'Lievitati') {
			const prodotti_raw = await client?.getEntries({
				content_type: 'prodotti'
			});

			prodotti = prodotti_raw?.items.filter((a) => {
				if (a.fields.tipologia == type) return true;
				else return false;
			});

			console.log(prodotti);
		} else {
			let prodotti_raw = await client?.getEntries({
				content_type: 'specialPage'
			});

			prodotti_raw = prodotti_raw?.items.filter((a) => {
				if (a.fields.type == type) return true;
				else return false;
			});

			title = prodotti_raw[0].fields.tItolo;
			descrizione = documentToHtmlString(prodotti_raw[0].fields.testo);
			slide = prodotti_raw[0].fields.slide;
		}
		loading = false;
	});

	function filter() {
		const url = new URL(window.location.href);
		type = url.searchParams.get('type');
		product_type = $product_types.filter((a) => {
			if (a.fields.tipologia == type) return true;
			else return false;
		});
		if (!loading) loading = false; // Trigger loading stop if the resources is already loaded
		return '';
	}
</script>

<svelte:head>
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

		p {
			font-family: 'Poppins', sans-serif;
			font-weight: normal;
		}
		h1 {
			font-family: 'Poppins', sans-serif;
			font-weight: 700;
		}
	</style>
</svelte:head>
<br />

{#if loading}
	<Loader />
{:else if $is_types_loaded}
	{filter()}
	<Banner
		prodotto={product_type[0].fields.nomeBanner}
		subtitle={product_type[0].fields.secondTextBanner}
		text={documentToHtmlString(product_type[0].fields.testoBanner)}
	/>

	{#if type != 'Lievitati'}
		<center>
			<div class="pure-g">
				{#each prodotti as prod}
					<div class="pure-u-1-3">
						<CardProdotti
							tipologia={prod.fields.nome}
							img={prod.fields.foto.fields.file.url.replace('//', 'https://')}
							testo={prod.fields.descrizioneBreve}
						/>
					</div>
				{/each}
			</div>
		</center>
	{:else}
		<div class="container">
			<h1 class="text-center">{title}</h1>
			<br />
			{@html descrizione}

			<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
				<div class="carousel-inner text-center">
					{#each slide as foto, i}
						{#if i == 0}
							<div class="carousel-item active">
								<img
									src={foto.fields.file.url.replace('//', 'https://')}
									class=""
									alt="..."
									width="512"
								/>
							</div>
						{:else}
							<div class="carousel-item   ">
								<img
									src={foto.fields.file.url.replace('//', 'https://')}
									class=""
									alt="..."
									width="512"
								/>
							</div>
						{/if}
					{/each}
				</div>
				<button
					class="carousel-control-prev"
					type="button"
					data-bs-target="#carouselExampleControls"
					data-bs-slide="prev"
				>
					<span class="carousel-control-prev-icon icon" aria-hidden="true" />
					<span class="visually-hidden">Previous</span>
				</button>
				<button
					class="carousel-control-next"
					type="button"
					data-bs-target="#carouselExampleControls"
					data-bs-slide="next"
				>
					<span class="carousel-control-next-icon icon" aria-hidden="true" />
					<span class="visually-hidden">Next</span>
				</button>
			</div>
		</div>
	{/if}
{/if}

<style>
	.icon {
		color: black;
		background-color: black;
	}
</style>
