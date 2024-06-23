"use client";

import {
  GetOrderSummary,
  NotLoadedButton,
  TotalOrderSummary,
} from "@/components";
import { SkeletonOrderSummary } from "@/components/ui/skeleton/cart/SkeletonOrderSummary";
import { useCartStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <SkeletonOrderSummary />;
  }

  return (
    <>
      {/* Container Logo Carrito - Resumen de la compra */}
      <div className="flex flex-col h-full justify-between">
        <div className="h-full lg:flex items-center justify-center hidden">
          <div className="preloader pr-4 my-1">
            <svg
              className="cart"
              role="img"
              aria-label="Shopping cart line animation"
              viewBox="0 0 128 128"
              width="128px"
              height="128px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="8"
              >
                <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
                  <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                  <circle cx="43" cy="111" r="13" />
                  <circle cx="102" cy="111" r="13" />
                </g>
                <g className="cart__lines" stroke="currentColor">
                  <polyline
                    className="cart__top"
                    points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                    stroke-dasharray="338 338"
                    stroke-dashoffset="-338"
                  />
                  <g className="cart__wheel1" transform="rotate(-90,43,111)">
                    <circle
                      className="cart__wheel-stroke"
                      cx="43"
                      cy="111"
                      r="13"
                      stroke-dasharray="81.68 81.68"
                      stroke-dashoffset="81.68"
                    />
                  </g>
                  <g className="cart__wheel2" transform="rotate(90,102,111)">
                    <circle
                      className="cart__wheel-stroke"
                      cx="102"
                      cy="111"
                      r="13"
                      stroke-dasharray="81.68 81.68"
                      stroke-dashoffset="81.68"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <GetOrderSummary
          itemsInCart={itemsInCart}
          subTotal={subTotal}
          tax={tax}
          gap="gap-2"
          mt="mt-2"
        />
      </div>
      
      {/* Total de la compra - Boton Checkout */}
      <div>
        <TotalOrderSummary total={total} />
        <div className="mt-5 w-full">
          <Link
            className="flex btn-primary justify-center"
            href="/checkout/address"
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
};
