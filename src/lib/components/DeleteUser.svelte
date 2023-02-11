<script lang="ts">
	import { reauthenticateWithCredential, type Auth, EmailAuthProvider, deleteUser } from 'firebase/auth';
	import { DialogContent, dialogs } from 'svelte-dialogs';
	import { doc, deleteDoc, Firestore, getDocs, collection, query, where } from "firebase/firestore";

	export let auth: Auth, db: Firestore;

	let email = '',
		password = '';

	async function delete_user_from_db(){
		const q = query(collection(db, 'users_data'), where('Email', '==', email));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(async (doc) => {
			await deleteDoc(doc.ref)
		});
	}
	function login() {
		const credential = EmailAuthProvider.credential(email, password);
		reauthenticateWithCredential(auth.currentUser, credential)
			.then(async () => {
				delete_user_from_db();
                deleteUser(auth.currentUser)
				.then(async () => {
					await dialogs.alert("Account cancellato correttamente");
				})
				.catch(() => {
					dialogs.alert("Errore durante la cancellazione dell'account");
				});
			})
			.catch((error) => {
				const errorMessage = error.message;
				if(errorMessage == "Firebase: Error (auth/user-not-found).")
					dialogs.alert("Utente non registrato")
				else if(errorMessage == "Firebase: Error (auth/wrong-password).")
					dialogs.alert("Password scorretta");
				else
					dialogs.alert("Accesso non riuscito");
			});
	}
</script>

<DialogContent>
	<svelte:fragment slot="body">
		<h3>Per ragioni di sicurezza, conferma il login</h3>
		<div class="container h-100">
			<div class="d-flex justify-content-center h-100">
				<div class="user_card">
					<div class="d-flex justify-content-center form_container">
						<form on:submit|preventDefault={login}>
							<div class="input-group mb-3">
								<div class="input-group-append">
									<span class="input-group-text"><i class="fas fa-user" /></span>
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
						</form>
					</div>
				</div>
			</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="footer">
		<div class="d-flex justify-content-center mt-3 login_container">
			<button class="btn login_btn" on:click={login}>Cancella account</button>
		</div>
	</svelte:fragment>
</DialogContent>
