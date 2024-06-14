import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number ) => void
  //removeProduct
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      //Methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
        //previusValue = El valor inicial que se ira acomulando
        //currentValue = El valor iterado
        //return cart.reduce((previusValue, currentValue) => previusValue + currentValue.quantity, 0);
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        //1. Revisar si el producto existe en el carrito con la talla seleccionada
        //Action: Agregar al carrito, y si este ya existe con el mismo id y size, entonces lo acutaliza con el updateCartProducts
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        //2. Se que el producto existe por talla |
        //Action: Agrega mas cantidad si el producto tiene la misma id y el mismo tamaño
        const updateCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });

        set({ cart: updateCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number ) => {
          const { cart } = get();
          const updatedCartProducts = cart.map(item => {
            if (item.id === product.id && item.size === product.size) {
              return { ...item, quantity: quantity };
            }
            return item
          })
          set({cart: updatedCartProducts} );
      }
    }),
    
    {
      name: "shoping-cart",
    }
  )
);
