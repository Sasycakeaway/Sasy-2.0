<script lang="ts">
	export let prodotto: string, subtitle: string, text: string;
</script>

<div class="container-fluid black py-5 mb-5 hero-header">
	<div class="container py-5">
		<div class="row justify-content-start">
			<div class="col-lg-8 text-center text-lg-start">
				<h1 class="font-secondary text-first mb-4">{prodotto}</h1>
				<h1 class="text-uppercase text-white mb-4">
					{subtitle}
				</h1>
				<p class="text-white cit">
					{@html text}
				</p>
				<!-- <div class="d-flex align-items-center justify-content-center justify-content-lg-start pt-5">
					<a href="" class="btn primary border-inner py-3 px-5 me-5">Read More</a>
					<button type="button" class="btn-play" data-bs-toggle="modal"
						data-src="https://www.youtube.com/embed/DWRcNpR6Kdc" data-bs-target="#videoModal">
						<span></span>
					</button>
					<h5 class="font-weight-normal text-white m-0 ms-4 d-none d-sm-block">Play Video</h5>
				</div> -->
			</div>
		</div>
	</div>
</div>

<style>
	.black {
		background-color: black;
	}
	.cit {
		font-size: 1.2em;
	}
</style>
