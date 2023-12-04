import NextAuth from 'next-auth';
import CreadentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/lib/database';
import User from '@/lib/models/user.model';


export const authOptions = {
  providers: [
    CreadentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any, req) {
        await connectToDB();
        try {
          const user = await User.findOne({ email: credentials.email });

          if(user) {
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
            if(isPasswordCorrect) {
              return user;
            }
          }

          const passwordValid = user && bcrypt.compare(credentials.password, user.password);

          if(passwordValid) {
            return user;
          }

          return null;
        } catch (error: any) {
          throw new Error(`Auth Error: ${error.message}`);
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };