// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

declare interface ProductType {
	fields: {
        logo: {
            fields: {
                file: {
                    url: ""
                }
            }
        }
    }
}
// declare interface Carrello {
//     [item_name]: string
// }