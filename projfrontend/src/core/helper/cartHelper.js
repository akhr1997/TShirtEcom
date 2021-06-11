export const addItemToCart = (item, next) => {
    let cart = [];
    if(typeof window !== undefined){// to get all items that already exists in the cart.
        //we check type of window to be a browser so that we can access local storage.
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        };

        cart.push({
            ...item,
        });

        localStorage.setItem("cart", JSON.stringify(cart))
        next();
    };
}

export const lordCart = () => {
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const removeItemFromCart = (productId) => {
    let cart = [];
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1)
            } 
        })

        localStorage.setItem("cart", JSON.stringify(cart))
    }

    return cart;
}

export const cartEmpty = (next) => {
    if(typeof window !== undefined){
        localStorage.removeItem("cart")
        let cart = [];
        localStorage.setItem("cart", JSON.stringify(cart))
        next();
    }
}