import { writable } from 'svelte/store';

export const product_types = writable([{    // Dummy product type structure
    fields: {
        tipologia: "",
        logo: {
            fields: {
                file: {
                    url: ""
                }
            }
        }
    }
}]);

export const is_types_loaded = writable(false);