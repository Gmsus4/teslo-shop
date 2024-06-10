'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { useState } from 'react';

interface Props{
    quanity: number;
}

export const QuantitySelector = ({ quanity }:Props) => {
    const [count, setCount] = useState(quanity);
    const onQuantityChange = (value: number) => {
        if(count + value < 1) return;
        setCount(count + value)
    }
  return (
    <div className="flex">
        <button onClick={() => onQuantityChange(-1)}>
            <IoRemoveCircleOutline size={30}/>
        </button>

        <span className="w-20 mx-3 px-5 bg-gray-100 text-center flex items-center justify-center">
            { count }
        </span>

        <button onClick={() => onQuantityChange(+1)}>
            <IoAddCircleOutline size={30}/>
        </button>
    </div>
  )
}
