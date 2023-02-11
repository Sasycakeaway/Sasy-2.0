<script lang="ts">
	import DeleteUser from '$lib/components/DeleteUser.svelte';
	import { firebase, firebase_loaded } from '$lib/ts/store';
	import { load_user_data } from '$lib/ts/user';
	import { getAuth, type Auth } from 'firebase/auth';
	import { Firestore, getFirestore } from 'firebase/firestore';
	import { dialogs } from 'svelte-dialogs';

	let auth: Auth;
	let db: Firestore;
	let user = {
		Nome: '',
		Cognome: '',
		Email: '',
		Telefono: 0,
		CF: ''
	};

	async function load_firebase() {
		// @ts-ignore
		auth = getAuth($firebase);
		db = getFirestore($firebase);
		auth.onAuthStateChanged(async function (user_db) {
			if (user_db?.email) {
				user = await load_user_data(db, user_db.email);
			} else {
				location.href = '/login';
			}
		});
		// @ts-ignore
		return '';
	}

	function signOut() {
		auth
			.signOut()
			.then(function () {
				location.href = '/login';
			})
			.catch(function (error) {
				dialogs.alert('Errore durante il logout');
			});
	}
</script>

{#if $firebase_loaded}
	<div style="visibility: hidden;">
		{load_firebase()}
	</div>

	<div class="container py-5">
		<div class="row">
			<div class="col-lg-3">
				<div class="card mb-4">
					<div class="card-body text-center">
						<!-- <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                    class="rounded-circle img-fluid" style="width: 150px;"> -->
						<h5 class="my-3">{user.Nome} {user.Cognome}</h5>
						<p class="text-muted mb-1">{user.Email}</p>
						<br />
						<div class="d-flex justify-content-center">
							<button type="button" class="btn btn-danger" on:click={signOut}>Logout</button>
							<button
								type="button"
								class="btn btn-warning ms-1"
								on:click={() => dialogs.modal(DeleteUser, { auth: auth, db: db })}
								>Cancella account</button
							>
						</div>
						<br />
					</div>
				</div>
			</div>
			<div class="col-lg-6">
				<div class="card mb-4">
					<div class="card-body">
						<div class="row">
							<div class="col-sm-3">
								<p class="mb-0">Nome</p>
							</div>
							<div class="col-sm-9">
								<p class="text-muted mb-0">{user.Nome} {user.Cognome}</p>
							</div>
						</div>
						<hr />
						<div class="row">
							<div class="col-sm-3">
								<p class="mb-0">Email</p>
							</div>
							<div class="col-sm-9">
								<p class="text-muted mb-0">{user.Email}</p>
							</div>
						</div>
						<hr />
						<div class="row">
							<div class="col-sm-3">
								<p class="mb-0">Numero di telefono</p>
							</div>
							<div class="col-sm-9">
								<p class="text-muted mb-0">{user.Telefono}</p>
							</div>
						</div>
						<hr />
						<div class="row">
							<div class="col-sm-3">
								<p class="mb-0">Codice Fiscale</p>
							</div>
							<div class="col-sm-9">
								<p class="text-muted mb-0">{user.CF}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="card mb-4">
					<a href="/area/my_order">
						<div class="card-body text-center">
							<img src="https://img.icons8.com/color/96/null/cardboard-box.png" alt="order_logo" />
							<h5 class="my-3">I miei ordini</h5>
							<p>Controlla qui i tuoi ordini effettuati</p>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}
