<script lang="ts">
	import client from '$lib/ts/contentful';
	import { onMount } from 'svelte';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
	import { BLOCKS, MARKS } from '@contentful/rich-text-types';
	import { is_mobile } from '$lib/ts/utils';

	let why = {
		fields: {
			// Dummy structure for why page
			testo: {},
			immagine: {
				fields: {
					file: {
						url: ''
					}
				}
			}
		}
	};
	const options = {
		renderMark: {
			[MARKS.BOLD]: (text) => `<b><span class="bold">${text}</span></b>`
		}
	};

	let mobile = false;

	onMount(async () => {
		const why_tmp = await client?.getEntries({
			content_type: 'why'
		});
		why = why_tmp?.items[0];
		mobile = is_mobile();
	});
</script>

<svelte:head>
	<style>
		b,
		strong {
			color: #e88f2a;
		}
	</style>
</svelte:head>
<div class="container">
	{#if mobile}
	<br />
	<br />
		<img
			class="img-fluid"
			src={why.fields.immagine.fields.file.url.replace('//', 'https://')}
			alt="Why sasy's description"
		/>
		<br />
		<br />
		<div class="container">
			<div
				class="section-title position-relative text-center mx-auto mb-5 pb-3"
				style="max-width: 600px;"
			>
				<h2 class="text-first font-secondary">Perchè scegliere Sasy's?</h2>
				<br />
			</div>
			{@html documentToHtmlString(why.fields.testo, options)}
		</div>
	{:else}
		<div class="row">
			<div class="col">
				<br />
				<br />
				<br />
				<br />
				<br />
				<img
					class="img-fluid"
					src={why.fields.immagine.fields.file.url.replace('//', 'https://')}
					alt="Why sasy's description"
				/>
			</div>
			<div class="col">
				<div class="container-fluid py-5">
					<div class="container">
						<div
							class="section-title position-relative text-center mx-auto mb-5 pb-3"
							style="max-width: 600px;"
						>
							<h2 class="text-first font-secondary">Perchè scegliere Sasy's?</h2>
							<br />
						</div>
						{@html documentToHtmlString(why.fields.testo, options)}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.section-title::after,
	.section-title::before {
		background: #5c5651;
	}

	.bold {
		color: #e88f2a;
		background-color: #e88f2a;
	}
	img {
		border-radius: 8px;
	}
</style>
