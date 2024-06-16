'use server'

import { signIn } from '@/auth.config';
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // console.log({ formData: Object.fromEntries(formData)})
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success'
  } catch (error) {
      console.log(error)
      return 'CredentialsSignin'
  }
}