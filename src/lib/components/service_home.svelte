<script>
	import { product_types } from '$lib/ts/store';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
	import CardProdotti from './Card_Prodotti.svelte';
</script>

<center>
	<div class="pure-g">
		{#each $product_types as types}
			<div class="pure-u-1-2">
				<CardProdotti
					img={types.fields.logo.fields.file.url.replace('//', 'https://')}
					tipologia={types.fields.tipologia}
					testo={documentToHtmlString(types.fields.descrizioneHome)}
				/>
			</div>
		{/each}
	</div>
</center>

