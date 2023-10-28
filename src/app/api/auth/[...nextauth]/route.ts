import { User } from "@/customType/user";
import { getUserByUserId } from "@/service/user";
import { verifyPassword } from "@/util/bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        userid: { label: "userid", type: "email" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        const userid = credentials!.userid;
        const password = credentials!.password;
        const userData = await getUserByUserId(userid);
        if (!userData) {
          return null;
        }

        const isValid = await verifyPassword(
          password,
          (userData as User).password
        );

        if (!isValid) {
          throw new Error("유효하지 않은 인증 정보");
        }

        return {
          id: (userData as User).id,
          userid: (userData as User).userid,
          username: (userData as User).username,
          image: (userData as User).profileImageUrl,
          isAdmin: (userData as User).isAdmin,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.userid = user.userid;
        token.username = user.username;
        token.image = user.image;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      const user = {
        id: token.id,
        userid: token.userid,
        username: token.username,
        image: token.image,
        isAdmin: token.isAdmin,
      };
      session.user = user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
