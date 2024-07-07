import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PostRequest } from "@/services/httpRequest";
import { jwtDecode } from "jwt-decode";
import { serverLogout } from "@/api/user-actions";
import { redirect } from "next/navigation";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        try {
          const response = await PostRequest("accounts/auth/jwt/create/", {
            email: credentials?.email,
            password: credentials?.password,
          });
          return response.data;
        } catch (err: any) {
          switch (err.status) {
            case 400:
            case 401:
              throw err;
            case 404:
              throw new Error("User not found");
            default:
              throw new Error("Something went wrong");
          }
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/signout",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token as any;

      return session;
    },

    async jwt({ token, user, trigger, session, account }) {
      // console.log(token, user, trigger, session, account);
      if (user) {
        return { ...token, ...user };
      }

      if (trigger === "update" && session) {
        return { ...token, ...session.user };
      }
      // console.log(session);
      // console.log("JWT Trigger: ", trigger);
      // console.log(token);
      // console.log(user);
      // console.log(account);

      const userInfo = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}accounts/info`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
          cache: "no-cache",
        }
      );

      if (userInfo.status === 401) {
        // session.destroy();
        redirect("/logout");
      }

      const info = await userInfo.json();
      const decodedJWT = jwtDecode(token.access as string);
      // console.log(decodedJWT);
      token.name = info.first_name;
      token.email = info.email;
      token.accessExpireTime = decodedJWT.exp; // 7 days from now

      return token;
    },
  },
};
