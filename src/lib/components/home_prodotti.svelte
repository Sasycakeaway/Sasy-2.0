<script lang="ts">
	import client from '$lib/ts/contentful';
	import { product_types } from '$lib/ts/store';
	import { onMount } from 'svelte';
	import type { ProductType } from "../../app.d.ts";

	let prodotti_type: ProductType[] = [];
	let prodotti = [];

	onMount(async () => {
		const prodotti_raw = await client?.getEntries({
			content_type: 'prodotti'
		});
		const prodotti_types_raw = await client?.getEntries({
			content_type: 'tipologiaProdotti'
		});
		prodotti_type = prodotti_types_raw?.items;
		prodotti = prodotti_raw?.items;
		prodotti_type = prodotti_type.sort((a, b) => {
			if(a.fields.id < b.fields.id)
				return -1;
			else if(a.fields.id > b.fields.id)
				return 1;
			else return 0;
		})
		$product_types = prodotti_type;
	});
</script>

<div class="container-fluid about py-5">
	<div class="container">
		<div
			class="section-title position-relative text-center mx-auto mb-5 pb-3"
			style="max-width: 600px;"
		>
			<h2 class="text-first font-secondary">I nostri prodotti</h2>
			<h1 class="display-4 text-uppercase">Explora qui tutti i nostri prodotti</h1>
		</div>
		<div class="tab-class text-center">
			<ul
				class="nav nav-pills d-inline-flex justify-content-center bg-dark text-uppercase border-inner p-4 mb-5"
			>
				{#each prodotti_type as type}
					<li class="nav-item">
						<a class="nav-link text-white" data-bs-toggle="pill" href="#{type.fields.tipologia}">{type.fields.tipologia}</a>
					</li>
				{/each}
			</ul>
			<div class="tab-content">
				{#each prodotti_type as type}
					<div id={type.fields.tipologia} class="tab-pane fade show p-0">
						<div class="griglia">
							{#each prodotti as prodotto}
								{#if prodotto.fields.tipologia == type.fields.tipologia}
									<div class="d-flex h-100">
										<div class="flex-shrink-0">
											{#if prodotto.fields.tipologia != "Apebox"}
											<img
												class="img-fluid"
												src={prodotto.fields.foto.fields.file.url.replace("//", "https://")}
												alt=""
												style="width: 200px; height: 150px;"
											/>
											{:else}
											<img
											class="img-fluid"
											src={prodotto.fields.foto.fields.file.url.replace("//", "https://")}
											alt=""
											style="width: 200px; height: 250px;"
										/>
											{/if}
											<!-- <h4 class="bg-dark text-first p-2 m-0">{prodotto.fields.prezzo}</h4> -->
										</div>
										<div
											class="d-flex flex-column justify-content-center text-start secondary border-inner px-4"
										>
											<h5 class="text-uppercase">{prodotto.fields.nome}</h5>
											<span
												>{prodotto.fields.descrizioneBreve}</span
											>
										</div>
									</div>
								{/if}
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.griglia {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
	}

.nav-pills {
    --bs-nav-pills-link-active-bg: #E88F2A;
}
</style>
