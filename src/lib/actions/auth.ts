import { signIn } from 'next-auth/react';
import { z as zod } from 'zod';


export const login = async (prevState: any, formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const credentialsSchema = zod.object({
      email: zod.string().min(1, 'Email is required!').email('Invalid email!'),
      password: zod.string().min(1, 'Password is required!').min(6, 'Password must have 6 characters'),
    });

    const validatedFields = credentialsSchema.safeParse({ email, password });

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }
    
    await signIn('credentials', { email, password, callbackUrl: '/' });
  } catch (error) {
    console.log('LOGIN ERROR', error)
  }
};