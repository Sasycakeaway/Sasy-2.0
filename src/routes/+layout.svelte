<script>
	import Header from './Header.svelte';
	import './styles.css';
	import 'bootstrap/dist/js/bootstrap.bundle.js';
	import Footer from '$lib/components/Footer.svelte';
	// Import the functions you need from the SDKs you need
	import { initializeApp } from 'firebase/app';
	// import { getAnalytics } from 'firebase/analytics';
	import { onMount } from 'svelte';
	import { firebase, firebase_loaded } from '$lib/ts/store';
	// TODO: Add SDKs for Firebase products that you want to use
	// https://firebase.google.com/docs/web/setup#available-libraries

	// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	const firebaseConfig = {
		apiKey: 'AIzaSyCxDwfprLETXl2TLd5MUjUL77AJ7bV2uuc',
		authDomain: 'sasy-s-cake-away-b8241.firebaseapp.com',
		projectId: 'sasy-s-cake-away-b8241',
		storageBucket: 'sasy-s-cake-away-b8241.appspot.com',
		messagingSenderId: '120672352884',
		appId: '1:120672352884:web:a5436ef5984a25e94a6f21',
		measurementId: 'G-WG2SNN2LN7'
	};

	let app, analytics;

	onMount(() => {
		// Initialize Firebase
		app = initializeApp(firebaseConfig);
		$firebase = app;
		$firebase_loaded = true;
		// analytics = getAnalytics(app);
	})

</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
	<Footer />
</div>
