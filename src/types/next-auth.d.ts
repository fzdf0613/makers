import { User as AuthUser, SessionUser } from "@/customType/user";

declare module "next-auth" {
  interface User {
    userid: string;
    username: string;
    image: string;
    isAdmin: boolean;
  }
  interface Session {
    user: SessionUser;
  }
}
