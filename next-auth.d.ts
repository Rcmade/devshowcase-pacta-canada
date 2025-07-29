import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  // role: UpsertUserResponseT["role"];
  // isOAuth: boolean;
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }

  // interface User extends UpsertUserResponseT {}
}

// declare module "@auth/core/jwt" {
//   interface JWT {
//     role?: UserRole;
//   }
// }
