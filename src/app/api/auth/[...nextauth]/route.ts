import NextAuth, { NextAuthOptions } from 'next-auth';
import CreadentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/lib/database';
import User from '@/lib/models/user.model';
import { authOptions } from '@/lib/next-auth';


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };