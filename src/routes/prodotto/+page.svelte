<script>
	import { onMount } from 'svelte';
	import client from '$lib/ts/contentful';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

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

	onMount(async () => {
		const url = new URL(window.location.href);
		const prod = url.searchParams.get('prod');

		const prodotti_raw = await client?.getEntries({
			content_type: 'prodotti'
		});

		prodotti = prodotti_raw?.items.filter((a) => {
			return a.fields.nome == prod;
		})[0];
		console.log(prodotti);
	});
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
        <div></div>
		<img
			src={prodotti.fields.foto.fields.file.url.replace('//', 'https://')}
			alt={prodotti.fields.nome}
			class="img-fluid"
			width="512"
		/>

		{@html documentToHtmlString(prodotti.fields.descrizioneLunga)}
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
</style>
