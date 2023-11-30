interface RegisterParams {
  name: string;
  phone: string;
  address?: string;
  photo?: string;
  email: string;
  password: string;
}

export const register = async (userData: RegisterParams) => {
  try {
    
  } catch (error: any) {
    throw new Error(error.message);
  }
}