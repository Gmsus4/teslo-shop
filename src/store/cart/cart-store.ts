import type { CartProduct } from "@/interfaces";
import { create } from "zustand";

interface State{
    cart: CartProduct[]


    addProductToCart: (product: CartProduct) => void
    //updateProductQuantity
    //removeProduct
}

export const useCartStore = create<State>()(
    (set, get) => ({
        cart: [],

        //Methods
        addProductToCart: (product: CartProduct) => {
            const { cart } = get();

            //1. Revisar si el producto existe en el carrito con la talla seleccionada
            //Action: Agregar al carrito, y si este ya existe con el mismo id y size, entonces lo acutaliza con el updateCartProducts
            const productInCart = cart.some(
                (item) => item.id === product.id && item.size === product.size
            )

            if( !productInCart){
                set({ cart: [ ...cart, product ]});
                return;
            }

            //2. Se que el producto existe por talla | 
            //Action: Agrega mas cantidad si el producto tiene la misma id y el mismo tamaño
            const updateCartProducts = cart.map((item) => {
                if(item.id  === product.id && item.size === product.size){
                    return { ...item, quantity: item.quantity + product.quantity}
                }

                return item;
            })

            set({ cart: updateCartProducts })
        }
    })
)