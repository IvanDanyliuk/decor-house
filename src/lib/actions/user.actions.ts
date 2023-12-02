import User from "../models/user.model"

export const getCurrentUser = async (email: string) => {
  return await User.findOne({ email });
}