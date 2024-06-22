'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props{
    quantity: number;

    onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }:Props) => {
    
    const onValueChanged = (value: number) => {
        if(quantity + value < 1) return;
        onQuantityChanged(quantity + value)
    }
  return (
    <div className="flex">
        <button onClick={() => onValueChanged(-1)}>
            <IoRemoveCircleOutline size={25}/>
        </button>

        <span className="w-10 bg-transparent mx-3 px-5 text-center flex items-center justify-center">
            { quantity }
        </span>

        <button onClick={() => onValueChanged(+1)}>
            <IoAddCircleOutline size={25}/>
        </button>
    </div>
  )
}
