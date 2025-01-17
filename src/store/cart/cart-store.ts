import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  }

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number ) => void
  removeProduct: (product: CartProduct) => void

  clearCart: () => void
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

      getSummaryInformation: () => {
        const { cart } = get();
        const subTotal = cart.reduce((subTotal, product) => (product.quantity * product.price) + subTotal  , 0);
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

        return{
          subTotal, tax, total, itemsInCart
        }
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
      },

      removeProduct: (product: CartProduct) => {
        // Obtiene el estado actual del carrito
        const { cart } = get();

         // Filtra el carrito para eliminar el producto con el mismo id y tamaño
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        // Actualiza el estado del carrito con los productos filtrados
        set({cart: updatedCartProducts} );
      },

      clearCart: () => {
        set({ cart: []})
      }
    }),
    
    {
      name: "shoping-cart",
    }
  )
);
