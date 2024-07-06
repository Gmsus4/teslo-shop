// ./actions/user.ts

import prisma from "@/lib/prisma";

interface Profile {
  email: string;
  name: string;
  picture?: string;
}

export const saveUserAuthProvider = async (profile: Profile) => {
  if (!profile.email || !profile.name) {
    throw new Error("Profile data is incomplete");
  }

  const userDB = await prisma.user.upsert({
    where: {
      email: profile.email.toLowerCase(),
    },
    create: {
      name: profile.name,
      email: profile.email,
      role: 'user',
      password: 'SIGNINGOOGLE',
      image: profile.picture || '',
    },
    select: {
      email: true,
      name: true,
      image: true,
      id: true,
      role: true
    },
    update: {
      email: profile.email,
    },
  });

  return userDB;
};
