"use server";

import { auth } from "@/lib/auth/auth";

export const currentUser = async () => {
  const user = await auth();
  return user?.user;
};
