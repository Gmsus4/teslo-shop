"use server";

export const paypalCheckPayment = async (paypalTransactionId: string | undefined) => {
  const authToken = await getPayPalBearerToken();
  console.log({authToken});
  if(!authToken){
    return {
      ok: false,
      message: 'No se pudo obtener el token de verificación'
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
    const result = await fetch(oauth2Url, requestOptions).then(r => r.json());
    return result.access_token; //Retornamos el valor access_tooken del resultado de la petición
  } catch (error) {
    console.log(error); //Mostramos el posible error en consola
    return null; //Retornamos null si existe un error.
  }
};
