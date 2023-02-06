<script lang="ts">
	export let description: string, testo: string, image: string;

	import IntersectionObserver from 'svelte-intersection-observer';
	let node;
</script>

<div class="timeline-row" bind:this={node}>
	<IntersectionObserver element={node} let:intersecting>
		{#if intersecting}
			<div class="timeline-time animate__fadeIn animate__animated ">
				{description}
			</div>
			<div class="timeline-content animate__fadeIn animate__animated ">
				<img src={image} alt="timeline foto" width="384" />
				<br />
				{@html testo}
			</div>
		{:else}
			<div class="timeline-time ">
				{description}
			</div>
			<div class="timeline-content ">
				<img src={image} alt="timeline foto" width="384" />
				<br />
				{@html testo}
			</div>
		{/if}
	</IntersectionObserver>
</div>

<style>
	img {
		border-radius: 8px;
	}
	.timeline-row {
		padding-left: 50%;
		position: relative;
		margin-bottom: 30px;
	}
	.timeline-row .timeline-time {
		position: absolute;
		right: 50%;
		top: 15px;
		text-align: right;
		margin-right: 20px;
		color: #2b2825;
		font-size: 1.5rem;
	}
	.timeline-row .timeline-content {
		position: relative;
		padding: 20px 30px;
		/* background: #1a233a; */
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		text-align: center;
	}
	.timeline-row .timeline-content:after {
		content: '';
		position: absolute;
		top: 20px;
		height: 16px;
		width: 16px;
		background: #1a233a;
	}
	.timeline-row .timeline-content:before {
		content: '';
		position: absolute;
		top: 20px;
		right: -49px;
		width: 20px;
		height: 20px;
		-webkit-border-radius: 100px;
		-moz-border-radius: 100px;
		border-radius: 100px;
		z-index: 10;
		/* background: #272e48; */
		border: 2px dashed #4b546f;
	}
	.timeline-row .timeline-content .thumbs img {
		margin: 5px;
		max-width: 60px;
	}
	.timeline-row:nth-child(even) .timeline-content {
		margin-left: 40px;
		text-align: left;
	}
	.timeline-row:nth-child(even) .timeline-content:after {
		left: -8px;
		right: initial;
		border-bottom: 0;
		border-left: 0;
		transform: rotate(-135deg);
	}
	.timeline-row:nth-child(even) .timeline-content:before {
		left: -52px;
		right: initial;
	}
	.timeline-row:nth-child(odd) {
		padding-left: 0;
		padding-right: 50%;
	}
	.timeline-row:nth-child(odd) .timeline-time {
		right: auto;
		left: 50%;
		text-align: left;
		margin-right: 0;
		margin-left: 20px;
	}
	.timeline-row:nth-child(odd) .timeline-content {
		margin-right: 40px;
	}
	.timeline-row:nth-child(odd) .timeline-content:after {
		right: -8px;
		border-left: 0;
		border-bottom: 0;
		transform: rotate(45deg);
	}

	@media (max-width: 992px) {
		.timeline .timeline-row:nth-child(odd) .timeline-time {
			position: relative;
			top: 0;
			left: 0;
			margin: 0 0 10px 0;
		}
		.timeline .timeline-row:nth-child(odd) .timeline-content {
			margin: 0;
		}
		.timeline .timeline-row:nth-child(odd) .timeline-content:before {
			display: none;
		}
		.timeline .timeline-row:nth-child(odd) .timeline-content:after {
			display: none;
		}
		.timeline .timeline-row:nth-child(even) .timeline-time {
			position: relative;
			top: 0;
			left: 0;
			margin: 0 0 10px 0;
			text-align: left;
		}
		.timeline .timeline-row:nth-child(even) .timeline-content {
			margin: 0;
		}
		.timeline .timeline-row:nth-child(even) .timeline-content:before {
			display: none;
		}
		.timeline .timeline-row:nth-child(even) .timeline-content:after {
			display: none;
		}
	}
</style>
