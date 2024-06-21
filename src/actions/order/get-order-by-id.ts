'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async(id: string) => {
    const session = await auth();
    if( !session?.user ){//Si no hay sesion del usuario
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }

    try {
        const order = await prisma.order.findUnique({
            where: { id: id },
            include: {
                OrderAddress: true, //Incluya todo el model OrderAddress
                OrderItem: { //Incluya del model OrderItem
                    select: { //Solo lo seleccionado manualmente
                        price: true, //El precio
                        quantity: true, //La cantidad
                        size: true, //El tamaño
                        

                        product: { //La relacion que hay entre el producto (Product) y la orden item(OrderItem)
                            select: { //Donde solo seleccionamos los
                                title: true, //Titulos
                                slug: true, //Los slug

                                ProductImage: { //Incluya del model ProductImage
                                    select: { //Lo seleccionado
                                        url: true //Incluya la url
                                    },
                                    take: 1 //Y solo tome el primer elemento
                                }
                            }
                        }
                    }
                }
            }
        });

        if(!order) throw `${id} no existe`;

        if( session.user.role === 'user'){
            if(session.user.id !== order.userId){
                throw `${id} no es de este usuario`
            }
        }

        return {
            ok: true,
            order: order
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Orden no existe'
        }
    }
}