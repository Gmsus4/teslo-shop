'use server'

export const getCodigoPostal = async(codigoPostal: string) => {
    const myHeaders = new Headers();
    myHeaders.append("APIKEY", `${process.env.DIPOMEX_APIKEY}`);
    
    const api = `https://api.tau.com.mx/dipomex/v1/codigo_postal?cp=${codigoPostal}`
    const requestOptions = {
      method: "GET",
      headers: myHeaders
    };
    
    //Try-Catch para el manejo de la petición
    try {
        //Hacemos la petición
        const result = await fetch(api, {
        ...requestOptions,
        cache: 'no-store'
        }).then(r => r.json());
        return result.codigo_postal; //Retornamos el valor del codigo postal de la petición
    } catch (error) {
        console.log('El error abajo xd'); //Mostramos el posible error en consola
        console.log(error); //Mostramos el posible error en consola
        return null; //Retornamos null si existe un error.
    }
}