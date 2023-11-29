import { connectToDB } from '../database';
import UserModel from '../models/user.model';

interface UserData {
  name: string;
  phone: string;
  address?: string;
  photo?: string;
  email: string;
  password: string;
}

export const signup = async (userData: UserData) => {
  try {
    connectToDB();

  } catch (error: any) {
    throw new Error(`Cannot create an account: ${error.message}`);
  }
}