<script lang="ts">
	import { firebase, firebase_loaded } from '$lib/ts/store';
	import { getAuth, createUserWithEmailAndPassword, type Auth } from 'firebase/auth';
	import { dialogs } from 'svelte-dialogs';
	import { getFirestore, collection, addDoc, Firestore } from 'firebase/firestore';
	import validator from 'validator';

	let auth: Auth, db: Firestore;
	let email = '',
		password = '',
		nome = '',
		cognome = '',
		nascita = new Date(),
		cf = '',
		telefono = 0,
		pass2 = "";

	function load_firebase() {
		// @ts-ignore
		auth = getAuth($firebase);
		// @ts-ignore
		db = getFirestore($firebase);
		return '';
	}
	
	function is_maggiorenne(d1: Date){
		const current_year = new Date().getFullYear();
		if(new Date(d1).getFullYear() < current_year){
			return true;
		} else {
			return false;
		}
	}


	const cf_regex = new RegExp("^[a-zA-Z]{6}[0-9]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9]{2}([a-zA-Z]{1}[0-9]{3})[a-zA-Z]{1}$");
	function create_new_account() {
		if (is_maggiorenne(nascita) && password == pass2 && cf_regex.test(cf)) {
			createUserWithEmailAndPassword(auth, email, password)
				.then(async (userCredential) => {
					const user = userCredential.user;
					await addDoc(collection(db, 'users_data'), {
						Nome: nome,
						Cognome: cognome,
						Email: user.email,
						Data: nascita,
						CF: cf,
						Telefono: telefono
					});
					location.href = "/login";
				})
				.catch((error) => {
					const errorMessage = error.message;
					if(errorMessage == "auth/email-already-in-use"){
						dialogs.alert("L'indirizzo email è già registrato");
					}else {
						dialogs.alert('Errore durante il login');
					}
				});
		}else {
			dialogs.alert("Data di nascita non valido o le password non corrispondono");
		}
	}
</script>

{#if $firebase_loaded}
	{load_firebase()}
	<br />
	<br />
	<br />
	<br />
	<br />
	<div class="container h-100">
		<div class="d-flex justify-content-center h-100">
			<div class="user_card">
				<div class="d-flex justify-content-center">
					<div class="brand_logo_container">
						<img src="/sasy_logo.jpeg" class="brand_logo" alt="Logo" />
					</div>
				</div>
				<div class="d-flex justify-content-center form_container">
					<form on:submit|preventDefault={create_new_account}>
						<div class="input-group mb-3">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-envelope" /></span>
							</div>
							<input
								type="text"
								name=""
								class="form-control input_user"
								placeholder="Email"
								bind:value={email}
							/>
						</div>
						<div class="input-group mb-2">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-key" /></span>
							</div>
							<input
								type="password"
								name=""
								class="form-control input_pass"
								placeholder="Password"
								bind:value={password}
							/>
						</div>
						<div class="input-group mb-2">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-key" /></span>
							</div>
							<input
								type="password"
								name=""
								class="form-control input_pass"
								placeholder="Conferma password"
								bind:value={pass2}
							/>
						</div>
						<div class="input-group mb-2">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fa fa-user" /></span>
							</div>
							<input
								type="text"
								name=""
								class="form-control input_pass"
								placeholder="Nome"
								bind:value={nome}
							/>
						</div>
						<div class="input-group mb-2">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fa fa-user" /></span>
							</div>
							<input
								type="text"
								name=""
								class="form-control input_pass"
								placeholder="Cognome"
								bind:value={cognome}
							/>
						</div>
						<div class="input-group mb-2">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-calendar" /></span>
							</div>
							<input
								type="date"
								name=""
								class="form-control input_pass"
								placeholder="Nascita"
								bind:value={nascita}
							/>
						</div>
						<div class="input-group mb-2">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-id-card" /></span>
							</div>
							<input
								type="text"
								name=""
								class="form-control input_pass"
								placeholder="Codice fiscale"
								bind:value={cf}
							/>
						</div>
						<div class="input-group mb-2">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-phone" /></span>
							</div>
							<input
								type="number"
								name=""
								class="form-control input_pass"
								placeholder="Numero di telefono"
								bind:value={telefono}
							/>
						</div>
						<div class="form-group">
							<!-- <div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customControlInline" />
								<label class="custom-control-label" for="customControlInline">Remember me</label>
							</div> -->
						</div>
						<div class="d-flex justify-content-center mt-3 login_container">
							<button type="submit" name="button" class="btn login_btn">Registrati</button>
						</div>
					</form>
				</div>

				<div class="mt-4">
					<div class="d-flex justify-content-center links">
						<a href="#">Registrazione</a>
					</div>
					<div class="d-flex justify-content-center">
						<a href="#">Password dimenticata</a>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	a {
		color: black;
	}
	/* Coded with love by Mutiullah Samim */
	.user_card {
		height: 600px;
		width: 350px;
		margin-top: auto;
		margin-bottom: auto;
		background: #f39c12;
		position: relative;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 10px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		-webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		-moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		border-radius: 5px;
	}
	.brand_logo_container {
		position: absolute;
		height: 170px;
		width: 170px;
		top: -75px;
		border-radius: 50%;
		background: #f9bec5;
		padding: 10px;
		text-align: center;
	}
	.brand_logo {
		height: 150px;
		width: 150px;
		border-radius: 50%;
		border: 2px solid white;
	}
	.form_container {
		margin-top: 100px;
	}
	.login_btn {
		width: 100%;
		background: #c0392b !important;
		color: white !important;
	}
	.login_btn:focus {
		box-shadow: none !important;
		outline: 0px !important;
	}
	.login_container {
		padding: 0 2rem;
	}
	.input-group-text {
		background: #c0392b !important;
		color: white !important;
		border: 0 !important;
		border-radius: 0.25rem 0 0 0.25rem !important;
	}
	.input_user,
	.input_pass:focus {
		box-shadow: none !important;
		outline: 0px !important;
	}
	.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
		background-color: #c0392b !important;
	}
</style>
