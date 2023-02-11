/* 
    Dummy cart structure

    const example_cart = {
        diamantini: 2,
        melighe: 2
    }

*/ 

/*
    
    This file contains all the generic handlers for the cart page

*/


function sum_element_in_cart(cart: any, item_name: string, qty: number) {
    cart[item_name] += qty; 

    return cart;
};

export function add_new_item(cart: any, item_name: string | null, qty: number){
    if(item_name)
        if(cart[item_name]) // Se il prodotto esiste già in cart
            cart = sum_element_in_cart(cart, item_name, qty);
        else
            cart[item_name] = qty;

    return cart;
};

export const update_cart = (cart: object) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const is_the_last_element = (qty: number) => qty == 1;

export const delete_product = (cart: any, item_name: string) => delete cart[item_name];