"use server";

import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";

export const paypalCheckPayment = async (paypalTransactionId: string | undefined) => {
  const authToken = await getPayPalBearerToken();
  console.log({authToken});
  if(!authToken){
    return {
      ok: false,
      message: 'No se pudo obtener el token de verificación'
    }
  }

  const resp = await verifyPayPalPayment(paypalTransactionId, authToken);

  if( !resp ) {
    return {
      ok: false,
      message: 'Error al verificar el pago'
    }
  }

  const { status, purchase_units } = resp;
  //const = {} = purchase_units[0]; //Todo: invoice ID

  if(status !== 'COMPLETED'){
    return {
      ok: false,
      message: 'Aún no se ha pagado en Paypal'
    }
  }

  //Todo: Realizar la actualizacion en nuestra base de datos
  try {
    console.log({status, purchase_units})
    await prisma.order.update({
      where: { id: '97975403-7541-469f-a39f-904c6f423215'},
      data: {
        isPaid: true,
        paidAt: new Date()
      }
    })

    //Todo: Revalidar Path
    
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'El pago no se pudo realizar'
    }
  }
};

const getPayPalBearerToken = async ():Promise<string | null > => { //Obtener nuestro token de acceso
  //Accedemos a nuestras variables de entorno
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID; 
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? '';

  //Creamos la base64 token que se necesita para hacer la petición
  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString('base64');

  //Configuramos los headers para hacer la petición
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Authorization",
    `Basic ${ base64Token }` //Agregamos la base64 que previamente habíamos creado
    // "Basic QVhVeXVkX1FrZm5POThjMEc3NEpNNXA4VmpmZ2l5TGw4ZGFmaFp5WGt4Umhva0lEU3FzdzJfMG5zOWhvZFBUOFkyc0lRR2hadE1HeEpMQ2o6RU5sYjNKa0FFNXJ2S05xeG8wWFZzUlB1akpmdDNvc1dNVFhlMDUtbFBPRVNiRjBheFpEdUdmcnR3bW9GZnllWVFMbzZKaFBqREpzaWFlZHk="
  );
  
  // Configuramos los parámetros del cuerpo de la petición
  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");// Añadimos el parámetro grant_type con el valor client_credentials

  //Configuramos las opciones de la peticiopetición
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  //Try-Catch para el manejo de la petición
  try {
    //Hacemos la petición
    const result = await fetch(oauth2Url, {
      ...requestOptions,
      cache: 'no-store'
    }).then(r => r.json());
    return result.access_token; //Retornamos el valor access_tooken del resultado de la petición
  } catch (error) {
    console.log(error); //Mostramos el posible error en consola
    return null; //Retornamos null si existe un error.
  }
};


const verifyPayPalPayment = async(paypalTransactionId: string | undefined, bearerToken: string):Promise<PayPalOrderStatusResponse | null > => {
  //Necesitamos paypalTransactionId y el authToken

  //Gestionamos la url para hacer la petición para obtener la orden de paypal
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  //Establecemos los headers de la petición
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);//En el Bearer pondremos el authToken, el que se obtiene de la función getPayPalBearerToken()

  //Configuramos las opciones de la petición
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  //Hacemos un try-catch para hacer la petición
  try {
    const resp = await fetch(paypalOrderUrl, {
      ...requestOptions,
      cache: 'no-store'
    }).then(r => r.json()); //Hacemos la petición y la respuesta la convertimos a json
    return resp; //Retornamos la respuesta
  } catch (error) {
    console.log(error);
    return null;
  }
}