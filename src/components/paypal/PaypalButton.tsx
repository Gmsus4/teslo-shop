'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData } from "@paypal/paypal-js"
import { paypalCheckPayment, setTransactionId } from "@/actions";

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
                    invoice_id: orderId, //Le va a decir a paypal, esta es la orden, por favor cuando crees este transactionId por favor colocale en sus propiedades, colocale que tambien esta es la orden. Si yo despues intento crear otra transaccion con esa misma ordenId, paypal no me va a dejar hacerlo
                    amount: {
                        value: `${rountedAmount}`,
                        currency_code: 'USD'
                    }
                }
            ]
        })

        const { ok } = await setTransactionId(orderId, transactionId);
        if(!ok){
            throw new Error("No se pudo actualizar la orden");
        }

        return transactionId;
    }

    const onApprove = async(data: OnApproveData, actions: OnApproveActions) => {
        const details = await actions.order?.capture();
        if ( !details ) return;

        await paypalCheckPayment( details.id ) //transactionID
    }

  return (
    <PayPalButtons 
        createOrder={ createOrder } 
        onApprove={ onApprove }
    />
  )
}
