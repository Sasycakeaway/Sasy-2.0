<script lang="ts">

	import client from '$lib/ts/contentful';
	import { onMount } from 'svelte';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

	let about = {
		fields: {
			intro: '',
			sotto: {},
			foto: {
				fields: {
					file: {
						url: '//'
					}
				}
			}
		}
	};

	onMount(async () => {
		const about_tmp = await client?.getEntries({
            content_type: 'aboutHomePage'
        });
		about = about_tmp?.items[0];
	});
</script>

<div class="container-fluid pt-5">
	<div class="container">
		<div
			class="section-title position-relative text-center mx-auto mb-5 pb-3"
			style="max-width: 600px;"
		>
			<h1 class="display-4 text-uppercase">Benvenuto in Sasy's Cake Away</h1>
		</div>
		<div class="row gx-5">
			<div class="col-lg-5 mb-5 mb-lg-0" style="min-height: 400px;">
				<div class="position-relative h-100">
					<img
						class="position-absolute w-100 h-100"
						src={about.fields.foto.fields.file.url.replace('//', 'https://')}
						alt="aside foto"
						style="object-fit: cover;"
					/>
				</div>
			</div>
			<div class="col-lg-6 pb-5">
				<h4 class="mb-4">{about.fields.intro}</h4>
				<p class="mb-5">{@html documentToHtmlString(about.fields.sotto)}</p>
				<div class="row g-5">
					<div class="col-sm-6">
						<div
							class="d-flex align-items-center justify-content-center primary border-inner mb-4"
							style="width: 90px; height: 90px;"
						>
							<i class="fa fa-heartbeat fa-2x text-white" />
						</div>
						<h4 class="text-uppercase">100% Artigianale</h4>
						<p class="mb-0">Usiamo solo prodotti del territorio piemontese 100% Artigianali!</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
