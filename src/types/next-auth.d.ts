import NextAuth from 'next-auth';

declare module "next-auth" {
  interface Session {
    user: {
      name:string;
      email: string;
      access: JWT;
      refreshToken: JWT;
      accessExpireTime: any;
      refreshExpireTime: Date;
      id: string;
      image?: string;
      is_staff: boolean;
      is_mod: boolean;
    };
  }

  interface User{
      name:string;
      email: string;
      access: JWT;
      refreshToken: JWT;
      accessExpireTime: any;
      refreshExpireTime: Date;
      id: string;
      image?: string;
      role: string;
      is_staff: boolean;
      is_mod: boolean;
    };
}