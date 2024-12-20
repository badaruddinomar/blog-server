export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: 'user' | 'admin';
  verifyCode?: string;
  isVerified: boolean;
  verifyCodeExpire?: Date;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  resetPasswordTokenExpire?: Date;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpire?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserSearchQuery {
  name?: {
    $regex: string;
    $options: string;
  };
}
