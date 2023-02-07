<script lang="ts">
    export let img: string, tipologia: string, testo: string;
</script>
<div class="col-lg-7">
    <div class="primary border-inner text-center text-white p-5 rounded">
        <img src={img} alt="{tipologia} logo" class="img-fluid"/>
        <br>
        <br>
        <h4 class="text-uppercase mb-3">{tipologia}</h4>
        {@html testo}
    </div>
</div>
<br>

<style>
	h4 {
		color: black;
	}
</style>
