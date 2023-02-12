<script lang="ts">
	import { is_mobile } from "$lib/ts/utils";
	import { onMount } from "svelte";


    export let img: string, tipologia: string, testo: string;

    let mobile = "card_height";

    onMount(() => {
        if(is_mobile()) mobile = "";    // Mobile don't need min-height
    })
</script>
<div class="col-lg-7">
    <div class="primary border-inner text-center text-white p-5 rounded {mobile}">
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
    .card_height {
        min-height: 40em;
    }
</style>
