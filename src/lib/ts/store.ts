import { writable } from 'svelte/store';

export const product_types = writable([{    // Dummy product type structure
    fields: {
        logo: {
            fields: {
                file: {
                    url: ""
                }
            }
        }
    }
}]);