<script>
	import client from '$lib/ts/contentful';
	import { onMount } from 'svelte';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
	import 'animate.css';
	import Timeline from '$lib/components/Timeline.svelte';

	let about = [];

	onMount(async () => {
		const about_tmp = await client?.getEntries({
			content_type: 'about'
		});

		about = about_tmp?.items;
		about = about.sort((a, b) => {
			if (a.fields.order < b.fields.order) return -1;
			else if (a.fields.order > b.fields.order) return 1;
			else return 0;
		});
	});
</script>

<div class="container">
	<div class="timeline">
		{#each about as timeline}
			<Timeline 
				testo={documentToHtmlString(timeline.fields.testo)}
				image={timeline.fields.image.fields.file.url.replace('//', 'https://')} 
				description={timeline.fields.timelineDescription}
			/>
		{/each}
	</div>
</div>

<style>
	.timeline {
		position: relative;
		/* background: #272e48; */
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		border-radius: 4px;
		padding: 5rem;
		margin: 0 auto 1rem auto;
		overflow: hidden;
	}
	.timeline:after {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		margin-left: -2px;
		border-right: 2px dashed #4b546f;
		height: 100%;
		display: block;
	}
	@media (max-width: 992px) {
		.timeline {
			padding: 15px;
		}
		.timeline:after {
			border: 0;
		}
	}
</style>
