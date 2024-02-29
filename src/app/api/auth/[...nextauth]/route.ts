import NextAuth, { NextAuthOptions } from 'next-auth';
import CreadentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { JWT } from 'next-auth/jwt';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/lib/database';
import User from '@/lib/models/user.model';


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
            } else {
              return null;
            }
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
    async jwt({ token, user, trigger, session }: any) {
      if (user) token.role = user.role;
      if(user) console.log('JWT', { token, user });
      if (trigger === 'update' && session?.name) {
        token.name = session.name;
      }
      if (trigger === 'update' && session?.email) {
        token.email = session.email;
      }
      return token;
    },
    async session({ session, token, trigger, newSession }: any) {
      if (session?.user) session.user.role = token.role;
      if (trigger === 'update' && newSession?.name) {
        session.name = newSession.name;
      }
      if (trigger === 'update' && newSession?.email) {
        session.email = newSession.email;
      }
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };