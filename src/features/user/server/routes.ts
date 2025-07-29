import { currentUser } from "@/action/currentUser";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { profileUpdateSchema } from "@/zodSchema/userSchema";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

export const userRoutes = new Hono()
  .get("/profile", async (c) => {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const [userProfile] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    return c.json({ user: userProfile });
  })
  .put("/", zValidator("json", profileUpdateSchema), async (c) => {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const input = c.req.valid("json");

    try {
      const updateResult = await db
        .update(users)
        .set({
          bio: input.bio,
          website: input.website || null,
          githubUrl: input.githubUrl || null,
          linkedinUrl: input.linkedinUrl || null,
          avatarUrl: input.avatarUrl || null,
        })
        .where(eq(users.id, userId));

      return c.json({ success: "Profile updated successfully!", updateResult });
    } catch (err) {
      console.error("[Profile Update Error]", err);
      return c.json({ error: "Failed to update profile" }, 500);
    }
  });
