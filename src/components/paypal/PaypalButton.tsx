'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js"

interface Props {
    orderId: string;
    amount: number;
}

export const PaypalButton = ({ orderId, amount}:Props) => {
    const [{ isPending }] = usePayPalScriptReducer();
    const rountedAmount = (Math.round(amount * 100)) / 100;
    if( isPending ){
        return (
            <div className="animate-pulse">
                <div className="h-9 bg-gray-300 rounded" />
                <div className="h-9 bg-gray-300 rounded mt-2"/>
            </div>
        )
    }

    const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
        const transactionId = await actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        value: `${rountedAmount}`,
                        currency_code: 'USD'
                    }
                }
            ]
        })

        //Todo: guardar el ID en la orden en la base de datos
        // actions/payments/setTransactionId
        // if(!ok){
        //     throw new Error('No se pudo actualizar la orden');
        // }

        console.log(transactionId); //Necesito almacenarlo en nuestra base de datos
        return transactionId;
    }

  return (
    <PayPalButtons 
        createOrder={ createOrder } //
    />
  )
}
