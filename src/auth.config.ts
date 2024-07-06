import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";
import Google from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";

const authenticatedRoutes = [
  //"/cart",
  "empty",
  "/checkout",
  "/profile",
  "/orders",
  "/admin",
];

const isOnAuthenticatedRoutes = (onRoute: string) => {
  return authenticatedRoutes.some(
    (
      authRoutes //Itera por cada elemento del array y si al menos uno coincide, esto retorna true
    ) => onRoute.startsWith(authRoutes) //Compara la iteracion de los elementos del array con la ruta en la que esta el usuario, si estas coninciden retorna true, si no coinciden retorna false
  );
};

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },

  callbacks: {
    async signIn({ account, profile, user }): Promise<boolean> {
      console.log(account?.provider)
      if (account?.provider === "google") {
        if (!profile?.email) {
          throw new Error("No profile");
        }

       const userDB = await prisma.user.upsert({
          where: { email: profile.email.toLowerCase() },
          create: {
            name: profile.name,
            email: profile.email,
            role: 'user',
            password: 'SIGNINGOOGLE',
            image: profile.picture,
          },
          update: { email: profile.email },
        });

        user.id = userDB.id
        user.role = userDB.role
      }

      if (account?.provider === "discord") {
        if (!profile?.email) {
          throw new Error("No profile");
        }

       const userDB = await prisma.user.upsert({
          where: { email: profile.email.toLowerCase() },
          create: {
            name: profile.username as any,
            email: profile.email,
            role: 'user',
            password: 'SIGNINGOOGLE',
            image: profile.image_url as any,
          },
          update: { email: profile.email },
        });

        user.id = userDB.id
        user.role = userDB.role
      }

      if (account?.provider === "github") {
        if (!profile?.email) {
          throw new Error("No profile");
        }

       const userDB = await prisma.user.upsert({
          where: { email: profile.email.toLowerCase() },
          create: {
            name: profile.username as any,
            email: profile.email,
            role: 'user',
            password: 'SIGNINGOOGLE',
            image: profile.image_url as any,
          },
          update: { email: profile.email },
        });

        user.id = userDB.id
        user.role = userDB.role
      }
      return true;
    },

    authorized({ auth, request: { nextUrl } }) {
      //console.log({auth})
      const isLoggedIn = !!auth?.user; //Saber si el usuario incio sesion

      if (isOnAuthenticatedRoutes(nextUrl.pathname)) {
        //Funcion que retorna true si la ruta es una ruta protegida solo para usuarios que inicien sesion
        if (isLoggedIn) return true; //Ahora que sabemos que necesita estar autenticado, si es asi, tiene acceso a la ruta
        return false; // Pero si no, entonces lo redirecciona a: auth/login - Redirect unauthenticated users to login page
      }
      return true; //Si la ruta no cae en ninguna ruta autorizada, entonces no hace nada, es una ruta para cualquier usuario.
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user;
        // console.log(user)
      }
      return token;
    },

    async session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null; //Formulario no es válido

        const { email, password } = parsedCredentials.data; //Extraemos la información
        //console.log({email, password});

        // Buscar el correo
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        }); //Verificamos el correo
        if (!user) return null; //Si el correo no existe

        // Comparar las contraseñas
        if (!bcryptjs.compareSync(password, user.password)) return null; //Si las contraseñas no hacen match

        // Regresar el usuario sin el password
        const { password: _, ...rest } = user;
        // console.log({rest});
        return rest;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
