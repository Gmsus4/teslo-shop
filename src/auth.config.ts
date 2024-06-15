import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';
 
export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account'
    },
    providers: [
        Credentials({
            async authorize(credentials) {
      
              const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);
      
                if ( !parsedCredentials.success ) return null; //Formulario no es válido
      
                const { email, password } = parsedCredentials.data; //Extraemos la información 
                console.log({email, password});

                // Buscar el correo
                const user = await prisma.user.findUnique({where: { email: email.toLowerCase() }}); //Verificamos el correo
                if(!user) return null; //Si el correo no existe
                
                // Comparar las contraseñas
                if(!bcryptjs.compareSync(password, user.password)) return null;//Si las contraseñas no hacen match
      
                // Regresar el usuario sin el password
                const {password: _, ...rest} = user;
                console.log({rest})
                return rest;
            },
          }),
    ]
};

export const { signIn, signOut, auth } = NextAuth( authConfig )