<script lang="ts">
	import { firebase, firebase_loaded } from '$lib/ts/store';
	import { load_user_data } from '$lib/ts/user';
	import { getAuth, type Auth } from 'firebase/auth';
	import { collection, Firestore, getDocs, getFirestore, query, where } from 'firebase/firestore';

	let auth: Auth,
		db: Firestore,
		orders = [];

	async function load_firebase() {
		// @ts-ignore
		auth = getAuth($firebase);
		db = getFirestore($firebase);
		auth.onAuthStateChanged(async function (user_db) {
			if (user_db?.email) {
				load_user_data(db, user_db.email).then((user) => get_orders(user));
			} else {
				location.href = '/login';
			}
		});

		// @ts-ignore
		return '';
	}

	async function get_orders(user) {
		const q = query(collection(db, 'orders'), where('email', '==', user.Email));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			orders.push(doc.data());
		});

		orders = orders;

		console.log(orders);
	}

	function bool_to_it(value) {
		if (value) return 'Si';
		else return 'No';
	}
</script>

{#if $firebase_loaded}
	{load_firebase()}

	<div class="container">
		{#each orders as order}
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Ordine {order.id}</h5>
					<!-- <p class="card-text">Prodotti ordinati: {JSON.stringify(order.cart)}</p> -->
					<ul>
						{#each Object.keys(order.cart) as order_json, i}
							<li>{Object.keys(order.cart)[i]}: {order.cart[order_json]}</li>
						{/each}
					</ul>
					<p>Indirzzo di consegna: {order.indirizzo_consegna}</p>
					<p>Consegna a domicilio: {bool_to_it(order.domicilio)}</p>
				</div>
			</div>
		{/each}
	</div>
{/if}
