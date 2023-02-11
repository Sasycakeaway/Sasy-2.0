<script>
	import { firebase } from '$lib/ts/store';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { dialogs } from 'svelte-dialogs';
	import { loadScript } from '@paypal/paypal-js';
	import { addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore';

	let cart = {},
		totale = 0;

	let paypal, button;

	let indirizzo = '',
		domicilio = false,
		email = '';

	function generateUUID() {
		// Public Domain/MIT
		var d = new Date().getTime(); //Timestamp
		var d2 =
			(typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16; //random number between 0 and 16
			if (d > 0) {
				//Use timestamp until depleted
				r = (d + r) % 16 | 0;
				d = Math.floor(d / 16);
			} else {
				//Use microseconds since page-load if supported
				r = (d2 + r) % 16 | 0;
				d2 = Math.floor(d2 / 16);
			}
			return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
		});
	}

	async function send_order_to_db() {
		const db = getFirestore($firebase);
		await addDoc(collection(db, 'orders'), {
			cart: cart,
			domicilio: domicilio,
			email: email,
			indirizzo_consegna: indirizzo,
			timestamp: new Date(),
			id: generateUUID()
		});
	}

	onMount(async () => {
		const auth = getAuth($firebase);
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				location.href = '/login'; // The user must be logged in to access cart
			} else {
				if (user.email) email = user.email;
			}
		});
		const cart_tmp = localStorage.getItem('cart');
		if (cart_tmp) cart = JSON.parse(cart_tmp);

		let totale_tmp = localStorage.getItem('totale');

		if (totale_tmp) totale = parseInt(totale_tmp);

		if (totale == 0) dialogs.alert('Carrello vuoto').then(() => (location.href = '/'));

		if (Object.keys(cart).length == 0) {
			dialogs
				.alert('Il carrello è vuoto, aggiungere prodotti per effettuare un pagamento.')
				.then(() => (location.href = '/'));
		}

		try {
			paypal = await loadScript({
				'client-id':
					'AXG9tYzRz10-7z2Hhro6tScAENTIHDtqWdFL9gqCx2hcH8-VqKG6gs1n3yMZzge6UvLVECsfdtezoLTk',
				currency: 'EUR'
			});
		} catch (error) {
			console.error('failed to load the PayPal JS SDK script', error);
		}

		if (paypal) {
			try {
				button = await paypal.Buttons({
					createOrder: function (data, actions) {
						// Set up the transaction
						return actions.order.create({
							purchase_units: [
								{
									amount: {
										value: totale
									}
								}
							]
						});
					},
					onApprove: async function () {
						await send_order_to_db();
						location.href = '/carrello/pagamenti/complete';
					},
					onError: function (error) {
						dialogs.alert('Errore durante il pagamento');
					}
				});
			} catch (error) {
				dialogs.alert('Errore durante il caricamento di paypal');
			}
		}
	});

	function pay() {
		if (indirizzo != '') button.render('#paypal_btn');
		else dialogs.alert('Inserisci un indirizzo valido');
	}
</script>

<svelte:head>
	<script
		src="https://www.paypal.com/sdk/js?client-id=AXG9tYzRz10-7z2Hhro6tScAENTIHDtqWdFL9gqCx2hcH8-VqKG6gs1n3yMZzge6UvLVECsfdtezoLTk&currency=EUR"
		data-namespace="paypal_sdk_2"
	></script>

	<script>
	</script>
</svelte:head>
<br />
<br />

<h1 style="text-align:center;">Effettua il pagamento per concludere l'ordine</h1>
<br />
<div class="container">
	<div class="input-group mb-3">
		<input
			type="text"
			class="form-control"
			placeholder="Indirizzo di consegna"
			aria-label="Indirizzo di consegna"
			aria-describedby="basic-addon1"
			bind:value={indirizzo}
		/>
	</div>

	<center>
		<input
			type="checkbox"
			placeholder="Cognome"
			aria-label="Cognome"
			aria-describedby="basic-addon2"
			id="domicilio"
			bind:checked={domicilio}
		/>
		<label for="domicilio">Consegna a domicilio</label>
	</center>
</div>

<br />
<br />

<center>
	<button type="button" class="btn primary text-white" on:click={pay}>Conferma l'acquisto</button>
</center>

<br />

<div id="paypal_btn" />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

	h1 {
		font-family: 'Poppins', sans-serif;
	}

	#paypal_btn {
		text-align: center;
		visibility: hidden;
	}

	button {
		text-align: center;
	}
</style>
