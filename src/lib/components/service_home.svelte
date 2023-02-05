<script>
	import { product_types } from "$lib/ts/store";
	import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
</script>

<div class="container">
	<div class="row g-5">
		{#each $product_types as types}
			<div class="col-lg-4 col-md-6">
				<div class="primary border-inner text-center text-white p-5">
                    <img src={types.fields.logo.fields.file.url.replace("//", "https://")} alt="{types.fields.tipologia} logo"/>
                    <br>
                    <br>
					<h4 class="text-uppercase mb-3">{types.fields.tipologia}</h4>
					{@html documentToHtmlString(types.fields.descrizioneHome)}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	h4 {
		color: black;
	}
</style>
