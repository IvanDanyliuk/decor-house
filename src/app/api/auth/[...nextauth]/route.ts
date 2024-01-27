import NextAuth, { NextAuthOptions } from 'next-auth';
import CreadentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/lib/database';
import User from '@/lib/models/user.model';
import { JWT } from 'next-auth/jwt';


export const authOptions: NextAuthOptions = {
  providers: [
    CreadentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any, req) {
        try {
          await connectToDB();

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT, user: any }) {
      if (user) token.role = user.role;
      if(user) console.log('JWT', { token, user })
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) session.user.role = token.role;
      // if(session) console.log('SESSION', { session, token });
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };